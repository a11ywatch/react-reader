## react-reader-view

[![j-mendez](https://circleci.com/gh/j-mendez/react-reader-view.svg?style=svg)](https://circleci.com/gh/j-mendez/react-reader)

Load any url into clean plain text for reading

Main Feature:

- This provides a Safari reader mode like feel that display's content cleanly (For Reading)

How to use:

- Just pass in a Url into the component and your good to go.

If you need to use this natively theres a react-native version [react-native-reader](https://github.com/j-mendez/react-native-reader)

## Installation Instructions

```bash
$ npm install react-reader-view
```

## Example

![Example App](https://raw.githubusercontent.com/A11yWatch/Project-Screenshots/master/react-reader.png)

```typescript
import ReaderView from "react-reader-view";

<ReaderView
  url="https://www.nytimes.com"
  css={`
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }
  `}
/>;
```

- For more help getting started checkout [Example](https://github.com/A11yWatch/react-reader-example-project)

## Available Props

| prop         | default      | type                                                                                   | description                                                               |
| ------------ | ------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| url          | ""           | string                                                                                 | Required: A valid web url source                                          |
| css          | ""           | string                                                                                 | Optional: A css stylesheet as a string                                    |
| renderLoader | "Loading..." | Component                                                                              | Optional: A custom component to render while your content is being loaded |
| iframeProps  | null         | object                                                                                 | Optional: A valid iframe html property                                    |
| onParse      | null         | function                                                                               | Optional: A callback function that returns the readability Object         |
| onError      | null         | function                                                                               | Optional: A function that fires the error if a url is not valid           |
| config       | undefined    | [Config](https://github.com/A11yWatch/clean-html-js/blob/master/src/clean-html.ts#L23) | Optional: configure html element determination                            |
