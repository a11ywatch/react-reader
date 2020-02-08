## react-reader-view

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

<ReaderView url="https://www.a11ywatch.com" />;
```

- For more help getting started checkout [Example](https://github.com/A11yWatch/react-reader-example-project)

## Available Props

| prop         | default      | type      | description                                                               |
| ------------ | ------------ | --------- | ------------------------------------------------------------------------- |
| url          | ""           | string    | Required: A valid web url source                                          |
| renderLoader | "Loading..." | Component | Optional: A custom component to render while your content is being loaded |
| iframeProps  | null         | object    | Optional: A valid iframe html property                                    |
| onParse      | null         | function  | Optional: A callback function that returns the readability Object         |
| onError      | null         | function  | Optional: A function that fires the error if a url is not valid           |
