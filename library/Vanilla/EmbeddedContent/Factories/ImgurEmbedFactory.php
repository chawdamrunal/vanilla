<?php
/**
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

namespace Vanilla\EmbeddedContent\Factories;

use Garden\Http\HttpClient;
use Vanilla\EmbeddedContent\AbstractEmbed;
use Vanilla\EmbeddedContent\AbstractEmbedFactory;
use Vanilla\EmbeddedContent\Embeds\ImgurEmbed;

/**
 * Factory for the ImgurEmbed.
 */
class ImgurEmbedFactory extends AbstractEmbedFactory {

    const IMGUR_COM = "imgur.com";
    const OEMBED_URL_BASE = "https://api.imgur.com/oembed";

    /**
     * @var string A regexp to match the full URL of a giphy embed.
     * @example https://media.giphy.com/media/kW8mnYSNkUYKc/giphy.gif
     */
    const FULL_SLUG_REGEX = "/\/media\/(?<postID>[a-zA-Z0-9]+)\/giphy\.gif$/";

    /** @var HttpClient */
    private $httpClient;

    /**
     * DI.
     *
     * @param HttpClient $httpClient
     */
    public function __construct(HttpClient $httpClient) {
        $this->httpClient = $httpClient;
    }

    /**
     * @inheritdoc
     */
    protected function getSupportedDomains(): array {
        return [self::IMGUR_COM];
    }

    /**
     * We pass along to the oembed service. If it can't parse the URL, then we definitely can't.
     * @inheritdoc
     */
    protected function getSupportedPathRegex(string $domain): string {
        // Imgur paths are incredibly complicated.
        // See https://www.reddit.com/r/redditdev/comments/35bb7i/imgur_link_format/ for examples.
        // We will pretty much always hit their API, so a pretty freeform slug should suffice.
        return '/.+/';
    }

    /**
     * Use the page scraper to scrape page data.
     *
     * @inheritdoc
     */
    public function createEmbedForUrl(string $url): AbstractEmbed {
        $response = $this->httpClient->get(
            self::OEMBED_URL_BASE,
            [ 'url' => $url ]
        );

        // Example Response JSON
        // {
        //     "width": 650,
        //     "author_url": "https://giphy.com/",
        //     "title": "Saved
        // By The Bell Hello GIF - Find & Share on GIPHY",
        //     "url": "https://media.giphy.com/media/kW8mnYSNkUYKc/giphy.gif",
        //     "type": "photo",
        //     "provider_name": "GIPHY",
        //     "provider_url": "https://giphy.com/",
        //     "author_name": "GIPHY",
        //     "height": 491
        // }

        // Parse the ID out of the URL.
        $fullUrl = $response['url'] ?? null;
        preg_match(self::FULL_SLUG_REGEX, $fullUrl, $matches);
        $id = $matches['postID'] ?? null;

        $data = [
            'embedType' => ImgurEmbed::TYPE,
            'url' => $url,
            'name' => $response['title'] ?? '',
            'height' => $response['height'] ?? null,
            'width' => $response['width'] ?? null,
            'giphyID' => $id,
        ];

        return new ImgurEmbed($data);
    }
}