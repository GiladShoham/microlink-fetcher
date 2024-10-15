# Open Graph Data Fetcher

This Node.js project fetches Open Graph data for a list of URLs and stores each result in a separate JSON file inside a `results` folder. It uses the [@microlink/mql](https://www.npmjs.com/package/@microlink/mql) API to retrieve the data and organizes the results by URL type and title.

## Features

- Fetch Open Graph data from a list of URLs using the `@microlink/mql` API.
- Store each URL's Open Graph data in a separate JSON file inside a `results` folder.
- Filename format: `type_title.json`, where `title` is sanitized from the Open Graph data.
- URLs are loaded from an external file (`urls.js`).

## Installation

1. Clone this repository to your local machine:

   ```bash
   https://github.com/GiladShoham/microlink-fetcher.git
   ```

2. Navigate to the project directory:

   ```bash
   cd microlink-fetcher
   ```

3. Install the necessary dependencies:

   ```bash
   pnpm install
   ```

## Usage

1. Prepare a file named `urls.js` in the root of your project that exports the URLs in the format `{ type: array of urls }`. For example:

   ```javascript
   module.exports = {
     urlsByType: {
       news: ['https://example.com/news1', 'https://example.com/news2'],
       blogs: ['https://example.com/blog1', 'https://example.com/blog2'],
     },
   };
   ```

2. Run the script:

   ```bash
   node run.js
   ```

   The script will:
   - Fetch Open Graph data for each URL listed in the `urls.js` file.
   - Save each URL's data in a separate JSON file inside a `results` folder.

## Example Output

Assume your `urls.js` file looks like this:

```javascript
module.exports = {
  urlsByType: {
    news: ['https://example.com/news1', 'https://example.com/news2'],
    blogs: ['https://example.com/blog1', 'https://example.com/blog2'],
  },
};
```

After running the script, you will find the following files inside the `results` folder:

```
results/
├── news_Example_News_Title.json
├── news_Another_News_Title.json
├── blogs_Example_Blog_Title.json
└── blogs_Another_Blog_Title.json
```

Each file contains the Open Graph data for the corresponding URL in JSON format.

## Notes

- If the Open Graph data doesn't contain a title, the filename will use `untitled` as a fallback.
- The script will sanitize file names to avoid illegal characters like `/`, `?`, `*`, etc.

## License

This project is licensed under the MIT License.