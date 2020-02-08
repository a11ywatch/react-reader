## react-reader-view

Load any url into clean plain text for reading. Strip away the noise.

Main Feature:

- This provides a Safari reader mode like feel that display's content cleanly (For Reading)

How to use:

- Just pass in a Url into the component and your good to go.

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

- For more help getting started checkout [Example](https://github.com/j-mendez/react-reader-example-project)

## Available Props

| prop         | default | type      | description                                                               |
| ------------ | ------- | --------- | ------------------------------------------------------------------------- |
| url          | ""      | string    | Required: A valid web url source                                          |
| renderLoader | null    | Component | Optional: A custom component to render while your content is being loaded |
| onError      | null    | function  | Optional: A function that fires the error if a url is not valid           |
| iframeProps  | null    | object    | Optional: A valid iframe html property                                    |
