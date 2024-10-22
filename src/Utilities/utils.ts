export function get_url_extension( url :string) {
    return url?.split('.').pop().split(/\#|\?/)[0]
}