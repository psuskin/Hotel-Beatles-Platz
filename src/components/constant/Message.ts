export interface Metadata {
    defaultTitle: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    siteName: string;
    twitterTitle: string;
    twitterDescription: string;
}

export interface Messages {
    metadata: Metadata;
    [key: string]: any;
}