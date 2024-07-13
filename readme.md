# yaml2csp

A node utility for converting a yaml file to a [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) header value.

## Motivation

CSP header values are often complex and it is useful to format these for
readability. However, http header values need to be a single line string.
By using yaml as a format we can include structure and comments.

## Usage

1. Install the utility (TBC)
2. Create your CSP yaml file
3. Run the command `yaml2csp parse ./my-csp.yaml`
4. Copy result from the console (or specify an output file with `-o`)

### Example yaml file

```yaml
frame-ancestors:
  - 'self'
  - 'https://www.coolwebsite.com'

default-src:
  - 'self' # we can use comments!!
  - 'https://*.foo.com'

script-src:
  - 'self'
  - 'unsafe-eval'
  - 'blob:'
  - 'https://www.coolwebsite.com'
  - 'https://*.another-website.com'

img-src:
  - 'data:'
  - '*'
```

### Example output

```text
frame-ancestors 'self' https://www.coolwebsite.com; default-src 'self' https://*.foo.com; script-src 'self' 'unsafe-eval' blob: https://www.coolwebsite.com https://*.another-website.com; img-src data: *
```
