export function cleanURL(url) {
    // Trim the URL
    url = url.trim();
    
    // Remove http:// or https://
    url = url.replace(/^https?:\/\//, '');
    
    // Remove trailing slashes
    url = url.replace(/\/+$/, '');
    
    return url;
}

