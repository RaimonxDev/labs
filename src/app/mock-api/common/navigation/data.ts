/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'ckeditor',
        title: 'CKEditor',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link: '/ckeditor'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'ckeditor',
        title: 'CKEditor',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/ckeditor'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'ckeditor',
        title: 'CKEditor',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/ckeditor'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'components',
        title: 'Components',
        type: 'collapsable',
        icon: 'heroicons_outline:cube-transparent',
        children: [
            {
                id: 'ckeditor',
                title: 'CKEditor',
                type: 'basic',
                icon: 'heroicons_outline:feather:edit',
                link: '/ckeditor'
            }
        ]
    }
];
