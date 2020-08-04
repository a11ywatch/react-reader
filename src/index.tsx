import React from "react";
import { cleanHtml } from "clean-html-js";

type ReadabilityState = {
  srcDoc?: string;
};

type ReadabilityProps = {
  url: string;
  title?: string;
  onError?: (result: string) => any;
  onParse?: (result: string) => any;
  renderLoader?: any;
  iframeProps?: any;
  css?: string;
};

class ReadabilityView extends React.PureComponent<
  ReadabilityProps,
  ReadabilityState
> {
  private sourcedDocExcludes: [string] = ["pdf"];

  static defaultProps = {
    url: "",
    renderLoader: "Loading...",
    iframeProps: {},
    onError: null,
    onParse: null,
  };

  componentDidMount() {
    this.parseHtml();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.url !== prevProps.url ||
      this.props.title !== prevProps.title
    ) {
      this.parseHtml();
    }
  }

  parseHtml = async () => {
    const { url, title, onError, onParse } = this.props;

    if (url.includes(".pdf")) {
      this.setState({ srcDoc: "pdf" });
      return;
    }

    try {
      const response = await fetch(url);
      const html = await response.text();
      const readabilityArticle = await cleanHtml(html, url);

      this.setState({
        srcDoc: !readabilityArticle
          ? `<span>Sorry, issue parsing ${url}</span>`
          : readabilityArticle.content,
      });
      if (typeof onParse === "function") {
        onParse(readabilityArticle);
      }
    } catch (err) {
      if (onError) {
        onError(err);
      }
    }
  };

  render() {
    const { renderLoader, url, iframeProps, css } = this.props;
    const srcDocState = this.state && this.state.srcDoc;
    const srcDoc =
      srcDocState && !this.sourcedDocExcludes.includes(srcDocState)
        ? `${
            typeof css === "string" ? `<style>${css}</style>` : ""
          }${srcDocState}`
        : null;

    return !srcDocState
      ? renderLoader
      : React.createElement("iframe", {
          url,
          srcDoc,
          ...iframeProps,
        });
  }
}

export default ReadabilityView;
