import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Award,
  BarChart2,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  CheckSquare,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  Headphones,
  Layers,
  MapPin,
  Megaphone,
  PenTool,
  PieChart,
  Plug,
  Receipt,
  Server,
  ShieldCheck,
  Smartphone,
  Truck,
  UserCheck,
  Users,
} from 'lucide-react';
import { TreeNavNode } from '../../data/navigationData';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Award,
  BarChart2,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  CheckSquare,
  Cloud,
  Code2,
  Database,
  Headphones,
  Layers,
  MapPin,
  Megaphone,
  PenTool,
  PieChart,
  Plug,
  Receipt,
  Server,
  ShieldCheck,
  Smartphone,
  Truck,
  UserCheck,
  Users,
};

interface NavigationTreeProps {
  nodes: TreeNavNode[];
  treeLabel: string;
  onNavigate?: () => void;
  onEscape?: () => void;
  variant?: 'dropdown' | 'drawer';
  autoFocusFirst?: boolean;
}

interface FlatVisibleNode {
  id: string;
  parentId: string | null;
  hasChildren: boolean;
  firstChildId: string | null;
}

export const NavigationTree: React.FC<NavigationTreeProps> = ({
  nodes,
  treeLabel,
  onNavigate,
  onEscape,
  variant = 'dropdown',
  autoFocusFirst = false,
}) => {
  const reducedMotion = useReducedMotion();
  const { pathname, hash, search } = useLocation();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const treeRef = useRef<HTMLDivElement>(null);

  const currentFullPath = `${pathname}${search}${hash}`;

  const isPathMatch = useCallback(
    (nodePath?: string) => {
      if (!nodePath) return false;
      if (nodePath === currentFullPath) return true;
      if (!nodePath.includes('#') && !nodePath.includes('?') && nodePath === pathname && !hash && !search) {
        return true;
      }
      return false;
    },
    [currentFullPath, pathname, hash, search],
  );

  const hasActiveDescendant = useCallback(
    (node: TreeNavNode): boolean => {
      if (isPathMatch(node.path)) return true;
      if (node.children) {
        return node.children.some((child) => hasActiveDescendant(child));
      }
      return false;
    },
    [isPathMatch],
  );

  const visibleNodes = useMemo<FlatVisibleNode[]>(() => {
    const result: FlatVisibleNode[] = [];
    const walk = (list: TreeNavNode[], parentId: string | null) => {
      for (const node of list) {
        const hasChildren = Boolean(node.children && node.children.length > 0);
        const firstChildId = hasChildren && node.children ? node.children[0].id : null;
        result.push({ id: node.id, parentId, hasChildren, firstChildId });
        if (hasChildren && node.children && expandedIds.has(node.id)) {
          walk(node.children, node.id);
        }
      }
    };
    walk(nodes, null);
    return result;
  }, [nodes, expandedIds]);

  const focusNodeById = useCallback((id: string) => {
    requestAnimationFrame(() => {
      const target = treeRef.current?.querySelector<HTMLElement>(
        `[data-tree-id="${CSS.escape(id)}"]`,
      );
      target?.focus();
    });
  }, []);

  useEffect(() => {
    if (autoFocusFirst && nodes.length > 0) {
      focusNodeById(nodes[0].id);
    }
  }, [autoFocusFirst, nodes, focusNodeById]);

  const toggleNode = useCallback((id: string) => {
    setSelectedId(id);
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const expandNode = useCallback((id: string) => {
    setSelectedId(id);
    setExpandedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const collapseNode = useCallback((id: string) => {
    setExpandedIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const handleItemKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    node: TreeNavNode,
  ) => {
    const idx = visibleNodes.findIndex((item) => item.id === node.id);
    if (idx === -1) return;
    const current = visibleNodes[idx];
    const isExpanded = expandedIds.has(node.id);

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const next = visibleNodes[idx + 1];
        if (next) focusNodeById(next.id);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prev = visibleNodes[idx - 1];
        if (prev) focusNodeById(prev.id);
        break;
      }
      case 'ArrowRight': {
        if (current.hasChildren) {
          e.preventDefault();
          if (!isExpanded) {
            expandNode(node.id);
          } else if (current.firstChildId) {
            focusNodeById(current.firstChildId);
          }
        }
        break;
      }
      case 'ArrowLeft': {
        if (current.hasChildren && isExpanded) {
          e.preventDefault();
          collapseNode(node.id);
        } else if (current.parentId) {
          e.preventDefault();
          focusNodeById(current.parentId);
        }
        break;
      }
      case 'Home': {
        e.preventDefault();
        if (visibleNodes[0]) focusNodeById(visibleNodes[0].id);
        break;
      }
      case 'End': {
        e.preventDefault();
        const last = visibleNodes[visibleNodes.length - 1];
        if (last) focusNodeById(last.id);
        break;
      }
      case 'Escape': {
        e.preventDefault();
        e.stopPropagation();
        onEscape?.();
        break;
      }
      default:
        break;
    }
  };

  const renderNodes = (list: TreeNavNode[], depth: number) => {
    const isDrawer = variant === 'drawer';

    return (
      <ul
        role={depth === 0 ? 'tree' : 'group'}
        aria-label={depth === 0 ? treeLabel : undefined}
        className={
          depth === 0
            ? 'space-y-0.5'
            : `relative mt-0.5 space-y-0.5 ${
                depth === 1 ? 'ml-5 pl-3' : 'ml-3.5 pl-3'
              } before:pointer-events-none before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-px before:bg-line`
        }
      >
        {list.map((node) => {
          const hasChildren = Boolean(node.children && node.children.length > 0);
          const isExpanded = hasChildren && expandedIds.has(node.id);
          const isCurrentRoute = isPathMatch(node.path);
          const isBranchActive =
            isExpanded || selectedId === node.id || hasActiveDescendant(node);
          const IconComp = node.iconName ? iconMap[node.iconName] || Layers : null;

          const rowBasePadding = isDrawer
            ? 'min-h-[44px] px-3 py-2'
            : depth === 0
            ? 'min-h-[38px] px-2.5 py-2'
            : 'min-h-[34px] px-2.5 py-1.5';

          const rowHighlightClass = isCurrentRoute
            ? 'bg-soft-blue/80 text-accent-text font-semibold'
            : isExpanded
            ? 'bg-surface/95 text-foreground font-semibold'
            : isBranchActive && depth === 0
            ? 'bg-surface/50 text-foreground font-semibold'
            : 'text-foreground hover:bg-surface/75';

          return (
            <li key={node.id} role="none" className="relative">
              {hasChildren ? (
                <>
                  <button
                    type="button"
                    role="treeitem"
                    aria-level={depth + 1}
                    aria-expanded={isExpanded}
                    data-tree-id={node.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleNode(node.id);
                    }}
                    onKeyDown={(e) => handleItemKeyDown(e, node)}
                    className={`group relative flex w-full items-center justify-between gap-2.5 rounded-xl text-left transition-all duration-150 active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent ${rowBasePadding} ${rowHighlightClass}`}
                  >
                    <span className="flex min-w-0 flex-1 items-center gap-2.5">
                      {(isExpanded || isCurrentRoute) && (
                        <span
                          aria-hidden="true"
                          className="h-3.5 w-0.5 shrink-0 rounded-full bg-orange"
                        />
                      )}

                      {depth === 0 && IconComp && (
                        <span
                          className={`clay-icon-box flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-transform duration-150 group-hover:scale-105 ${
                            isExpanded ? 'text-accent-text' : ''
                          }`}
                        >
                          <IconComp className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      )}

                      <span
                        className={`min-w-0 flex-1 truncate ${
                          depth === 0
                            ? 'font-display text-[13px] font-semibold text-foreground'
                            : depth === 1
                            ? 'text-[12.5px] font-medium text-foreground'
                            : 'text-xs font-medium text-muted group-hover:text-foreground'
                        }`}
                      >
                        {node.label}
                      </span>
                    </span>

                    <span className="flex shrink-0 items-center gap-1.5">
                      {depth === 0 && node.children && (
                        <span className="font-mono text-[11px] text-muted tabular-nums">
                          {node.children.length}
                        </span>
                      )}
                      <ChevronRight
                        className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
                          isExpanded
                            ? 'rotate-90 text-orange'
                            : 'text-muted group-hover:text-accent-text'
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && node.children && (
                      <motion.div
                        initial={reducedMotion ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={reducedMotion ? undefined : { opacity: 0, height: 0 }}
                        transition={{
                          duration: reducedMotion ? 0 : 0.24,
                          ease: [0.32, 0.72, 0, 1],
                        }}
                        className="overflow-hidden"
                      >
                        {renderNodes(node.children, depth + 1)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  to={node.path || '/'}
                  role="treeitem"
                  aria-level={depth + 1}
                  aria-current={isCurrentRoute ? 'page' : undefined}
                  data-tree-id={node.id}
                  onClick={() => {
                    setSelectedId(node.id);
                    onNavigate?.();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === ' ') {
                      e.preventDefault();
                      (e.currentTarget as HTMLAnchorElement).click();
                      return;
                    }
                    handleItemKeyDown(e, node);
                  }}
                  className={`group relative flex w-full items-center justify-between gap-2 rounded-xl text-left transition-all duration-150 active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent ${rowBasePadding} ${rowHighlightClass}`}
                >
                  <span className="flex min-w-0 flex-1 items-center gap-2.5">
                    {isCurrentRoute && (
                      <span
                        aria-hidden="true"
                        className="h-3.5 w-0.5 shrink-0 rounded-full bg-orange"
                      />
                    )}

                    {depth === 0 && IconComp && (
                      <span className="clay-icon-box flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
                        <IconComp className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    )}

                    <span
                      className={`min-w-0 flex-1 truncate ${
                        depth === 0
                          ? 'font-display text-[13px] font-semibold'
                          : isCurrentRoute
                          ? 'text-xs font-semibold text-accent-text'
                          : 'text-xs font-medium text-muted group-hover:text-accent-text'
                      }`}
                    >
                      {node.label}
                    </span>
                  </span>

                  <ArrowRight
                    className={`h-3 w-3 shrink-0 transition-all duration-150 ${
                      isCurrentRoute
                        ? 'text-orange opacity-100'
                        : 'text-accent-text opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div ref={treeRef} className="w-full">
      {renderNodes(nodes, 0)}
    </div>
  );
};
