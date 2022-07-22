from urllib.parse import urlparse, urlunparse, quote


def normalize_url(url: str) -> str:
    parts = urlparse(url)
    return urlunparse(parts._replace(path=quote(parts.path)))

def normalize_phones(phones: str | tuple) -> str:
    if isinstance(phones, str):
        return phones
    return ','.join(map(str, phones))
