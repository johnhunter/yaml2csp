# yaml2csp

A node CLI utility for converting a yaml file to a [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) header value.

## Motivation

CSP header values are often complex and it is useful to format these for
readability. However, http header values need to be a single line string.
By using yaml as a format we can include structure and comments.

These strings can then be used in http header configuration for servers and
reverse-proxies.

## Usage

1. Create your CSP yaml file
2. Install and run the utility
   - Either: `npx @johnhunter/yaml2csp parse <yaml file>`
   - Or:
     - `npm install -g @johnhunter/yaml2csp`
     - Then `yaml2csp parse <yaml file>`
3. Copy result from the console (or specify an output file with `-o`)

## Example

### Yaml source file:

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

### Generated output:

```text
frame-ancestors 'self' https://www.coolwebsite.com; default-src 'self' https://*.foo.com; script-src 'self' 'unsafe-eval' blob: https://www.coolwebsite.com https://*.another-website.com; img-src data: *
```

## Resources

- MDN documentation for [CSP concepts](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) and the [http header syntax](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)
- https://cspvalidator.org - validate the output string for correctness
