import { generatedImages } from '../assets/images';

export interface VideoAssetConfig {
  videoSrc: string;
  posterImage: string;
  fallbackImage: string;
  caption: string;
  overlayOpacity?: number;
}

export const videoConfig: Record<string, VideoAssetConfig> = {
  heroVideo: {
    videoSrc: '/assets/aistudio/Designing_software_website_anima__db660b55_1080p_52e46a57.mp4',
    posterImage: generatedImages.introEnterpriseCampus,
    fallbackImage: generatedImages.introEnterpriseCampus,
    caption: 'Prakvi Enterprise Solutions & Digital Transformation',
    overlayOpacity: 0.25,
  },
  aboutVideo: {
    videoSrc: '/videos/company-story.mp4',
    posterImage: generatedImages.aboutInnovationStudio,
    fallbackImage: generatedImages.aboutInnovationStudio,
    caption: 'Prakvi Corporate Headquarters & Delivery Centers',
    overlayOpacity: 0.35,
  },
  servicesVideo: {
    videoSrc: '/videos/technology.mp4',
    posterImage: '/img/cloud_data_datacenter_1794479543953.jpg',
    fallbackImage: '/img/cloud_data_datacenter_1794479543953.jpg',
    caption: 'Cloud Orchestration, Mobility & Enterprise Engineering',
    overlayOpacity: 0.6,
  },
  careersVideo: {
    videoSrc: '/videos/culture.mp4',
    posterImage: '/img/careers_culture_team_1794479543837.jpg',
    fallbackImage: '/img/careers_culture_team_1794479543837.jpg',
    caption: 'Collaborative Innovation Culture at Prakvi',
    overlayOpacity: 0.6,
  },
};
