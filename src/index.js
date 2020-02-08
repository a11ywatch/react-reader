import React, { PureComponent } from "react";
import { cleanHtml } from "clean-html-js";

class ReadabilityView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cleanHtmlSource: undefined,
      readabilityArticle: null
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
    const { url, title, onError } = this.props;

    try {
      const response = await fetch(url);
      const html = await response.text();
      const readabilityArticle = await cleanHtml(html, url);

      this.setState({
        cleanHtmlSource: !readabilityArticle
          ? `<h1>Sorry, issue parsing ${url}</h1>`
          : readabilityArticle.content,
        readabilityArticle
      });
    } catch (err) {
      if (onError) {
        onError(err);
      }
    }
  }

  render() {
    const { renderLoader, url, iframeProps } = this.props;
    const { cleanHtmlSource: srcDoc } = this.state;

    return srcDoc === undefined
      ? renderLoader
      : React.createElement("iframe", { url, srcDoc, ...iframeProps });
  }
}

ReadabilityView.defaultProps = {
  url: "",
  onError: null,
  renderLoader: "Loading...",
  iframeProps: {}
};

export default ReadabilityView;
