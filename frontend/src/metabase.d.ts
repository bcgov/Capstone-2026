import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'metabase-dashboard': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          token: string;
          'with-title'?: 'true' | 'false' | string;
          'with-downloads'?: 'true' | 'false' | string;
        },
        HTMLElement
      >;
    }
  }
}