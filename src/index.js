import React, { PureComponent } from "react";
import { cleanHtml } from "clean-html-js";

class ReadabilityView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      srcDoc: undefined
    };

    this.parseHtml = this.parseHtml.bind(this);
  }

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

  async parseHtml() {
    const { url, title, onError, onParse } = this.props;

    try {
      const response = await fetch(url);
      const html = await response.text();
      const readabilityArticle = await cleanHtml(html, url);

      this.setState({
        srcDoc: !readabilityArticle
          ? `<span>Sorry, issue parsing ${url}</span>`
          : readabilityArticle.content
      });

      if (typeof onParse === "function") {
        onParse(readabilityArticle);
      }
    } catch (err) {
      if (onError) {
        onError(err);
      }
    }
  }

  render() {
    const { renderLoader, url, iframeProps } = this.props;
    const { srcDoc } = this.state;

    return srcDoc === undefined
      ? renderLoader
      : React.createElement("iframe", { url, srcDoc, ...iframeProps });
  }
}

ReadabilityView.defaultProps = {
  url: "",
  renderLoader: "Loading...",
  iframeProps: {},
  onError: null,
  onParse: null
};

export default ReadabilityView;
