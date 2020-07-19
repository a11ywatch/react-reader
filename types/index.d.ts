import React from "react";
declare type ReadabilityState = {
    srcDoc?: string;
};
declare type ReadabilityProps = {
    url: string;
    title?: string;
    onError?: (result: string) => any;
    onParse?: (result: string) => any;
    renderLoader?: any;
    iframeProps?: any;
    css?: string;
};
declare class ReadabilityView extends React.PureComponent<ReadabilityProps, ReadabilityState> {
    static defaultProps: {
        url: string;
        renderLoader: string;
        iframeProps: {};
        onError: null;
        onParse: null;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    parseHtml: () => Promise<void>;
    render(): any;
}
export default ReadabilityView;
