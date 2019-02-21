# 2018 Headlines Visualization
Explore every 2018 headline from the New York Times and The Guardian. Search for a topic or phrase, 
compare the coverage, and download the results. Use this tool for research or for fun. Download the code 
and make your own visualization.

## Use
For a quick spin, visit [https://2018-headlines.sosolimited.com](https://2018-headlines.sosolimited.com). 

If you'd like to use the page locally, 
[download a zip archive](https://github.com/sosolimited/2018-Headlines-Explorer/archive/master.zip)
and open `index.html` in your browser.

## Search Features
- singular terms: `brexit`
- comma separated to match headlines with any of the listed words: `trump, clinton`
- space separated to match headlines containing all terms in a specific order: `north korea`
- wildcard asterisk to match headlines with words containing the fragment at the start: `tech*`

The search operates across simplified versions of the headlines: lower-cased, without punctuation or possessives. 
E.g. searching for `hillary clinton` would match a headline containing the fragment `Hillary Clinton's Campaign [...]`.

Note: each paper has different standards for the use of punctuation within acronyms so it's best to 
include both when searching. e.g. `EPA, E.P.A.`

## CSV exporting
The page supports exporting search results in CSV format. The various export types are linked to in the header. 
The CSVs reflect all search options, including source selection.

## headlines.json format
`data/headlines.json` contains an ordered array of 53 items. Each item is an object with a full week's worth of
headlines from both The Guardian and the NYT. The first item represents the week of Jan 1, 2018. 
The last object holds headlines from the week of Dec 24, 2018, with headlines through Dec 31, 2018.
```
[
  {
    "week": "2018-W01",
    "nyt": [
      {
        "headline": "Tom Brokaw: You Can Find the Entire World Inside Your Hospital",
        "date": "2018-01-01T00:02:50.000Z",
        "url": "https://www.nytimes.com/2017/12/31/opinion/tom-brokaw-health-care-immigrants.html",
        "tokens": ["tom", "brokaw", "you", "can", "find", "the", "entire", "world", "inside", "your", "hospital"]
      },
      ...
    },
    "guardian": [
      ...
    ]
  },
  ...
]
```

For details on token list generation, see [tokenization.md](tokenization.md);

## Sources

[![NYT API](img/poweredby_nytimes_200a.png)](https://developer.nytimes.com)

Data provided by the [The Guardian Open Platform](https://open-platform.theguardian.com).

## License

[MIT](http://www.opensource.org/licenses/MIT)
