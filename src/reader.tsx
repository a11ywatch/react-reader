import React from "react";
import cleanHtml from "clean-html-js";
import type { Config as CleanHtmlConfig, ReaderObject } from "clean-html-js";

type ReadabilityState = {
  srcDoc?: string;
};

type ReadabilityProps = {
  config?: CleanHtmlConfig;
  url: string;
  title?: string;
  onError?: (result: string) => any;
  onParse(result: ReaderObject): void;
  renderLoader?: any;
  iframeProps?: any;
  css?: string;
};

class ReadabilityView extends React.PureComponent<
  ReadabilityProps,
  ReadabilityState
> {
  private sourcedDocExcludes: [string] = ["pdf"];
  private mounted: boolean = false;

  static defaultProps = {
    url: "",
    renderLoader: "Loading...",
    iframeProps: {},
    onError: null,
    onParse: null,
  };

  componentDidMount() {
    this.mounted = true;
    this.parseHtml();
  }

  componentWillUnmount() {
    this.mounted = false;
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

    try {
      if (!this.mounted) {
        return;
      }
      if (url.includes(".pdf")) {
        this.mounted && this.setState({ srcDoc: "pdf" });
        return;
      }
      const response = this.mounted && (await fetch(url));
      const html = this.mounted && (await response.text());
      const readabilityArticle = this.mounted && (await cleanHtml(html, url));

      this.mounted &&
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
