export interface VideoAssetConfig {
  videoSrc: string;
  posterImage: string;
  fallbackImage: string;
  caption: string;
  overlayOpacity?: number;
}

export const videoConfig: Record<string, VideoAssetConfig> = {
  heroVideo: {
    videoSrc: '/videos/hero.mp4',
    posterImage: '/src/assets/images/hero_enterprise_cinematic_1794479542547.jpg',
    fallbackImage: '/src/assets/images/hero_enterprise_cinematic_1794479542547.jpg',
    caption: 'Intelligent Enterprise Networks & Cloud Architectures',
    overlayOpacity: 0.72,
  },
  aboutVideo: {
    videoSrc: '/videos/company-story.mp4',
    posterImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    fallbackImage: '/src/assets/images/hero_enterprise_cinematic_1794479542547.jpg',
    caption: 'Prakvi Corporate Headquarters & Delivery Centers',
    overlayOpacity: 0.55,
  },
  servicesVideo: {
    videoSrc: '/videos/technology.mp4',
    posterImage: '/src/assets/images/cloud_data_datacenter_1794479543953.jpg',
    fallbackImage: '/src/assets/images/cloud_data_datacenter_1794479543953.jpg',
    caption: 'Cloud Orchestration, Mobility & Enterprise Engineering',
    overlayOpacity: 0.6,
  },
  careersVideo: {
    videoSrc: '/videos/culture.mp4',
    posterImage: '/src/assets/images/careers_culture_team_1794479543837.jpg',
    fallbackImage: '/src/assets/images/careers_culture_team_1794479543837.jpg',
    caption: 'Collaborative Innovation Culture at Prakvi',
    overlayOpacity: 0.6,
  },
};
