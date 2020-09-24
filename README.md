# Shopgate Connect - Filter sort options

Custom sort options for search and category pages.

## Dependency

This extension was made to use in conjunction with [Amazon CloudSearch search integration for Shopgate Connect](https://github.com/shopgate/ext-search-cloudsearch)
But can be also used for other search providers, if they support given custom sort options


## Configuration

Set the following value in your Shopgate Connect Admin:

* sortOptions - (json) map for sort options

The map key should be in format `<sort_option>:(asc|desc)`

Sort options will be appended to existing sort optionsappear as they are configured. If you wanr

## Example value
```
{
  "sortOptions": {
    "attr_i1:asc": "By delivery time",
    "created:desc": "Recently added",
    "attr_i2:desc": "By popularity",
    "attr_i3:desc": "By customer rating"
  }
}
```

## Available custom sort options for `ext-search-cloudsearch`

Consult Shopgate support about indexing the data

* created - recently created
* discount - product discount
* tags - product tags
* attr_i1 (integer) custom integer field
* attr_i2 (integer) custom integer field
* attr_i3 (integer) custom integer field
* attr_s1 (string) custom literal field
* attr_s2 (string) custom literal field
* attr_s3 (string) custom literal field

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.
## License
See the [LICENSE](./LICENSE) file for more information.
