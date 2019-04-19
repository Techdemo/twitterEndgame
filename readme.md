# Real time web

## My Concept
My concept consists of visualizing the most favourable characters of the upcoming movie _Avengers: Endgame_.
Based on a twitter stream based on #avengersendgame, my application will measure positive and negative tweets about certain characters in the film. When a character gets a negative mention, he/she/it will drop in popularity. With a positive mention, that character will become more popular and thus will be placed higher in the ratings. With a higher rating, the characterbubble will grow in size.

## The Api
I'm using the Twitter api which needs Oauth2. For setting up a live twitter stream I will make use of [Twit]("https://www.npmjs.com/package/twit"). To connect to the Twitter api. To analyze the tweets based on negative mentions or positive mentions, I will make use of [Sentiment]("https://www.npmjs.com/package/sentiment"). Sentiment uses natural language processing, text analyses and emoji ranking to decide wether a tweet is negative or positive.

There are multiple ways in which you can retrieve data from the twitter Api. For example, you can make some simple fetch requests to the api. I'm making use of the streaming capabilities of the api. The standard way of fetching data to the api has a rate limit. By streaming the data from the api, it will give me two advantages:
1. There is almost no rate limit. The rate limit for the streaming api is roughly 60 tweets per second.
2. It will give me more acces to realtime data.

## Sketches
<details><summary>General Sketch</summary>
<p>
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")
</p>
</details>

<details><summary>Data Model</summary>
<p>
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")
</p>
</details>

## Datamodel
```
let tweet = {[
    twid = stream.id,
    avatar = stream.user.profile_image_url,
    body = stream.text,
    favor = sentiment.analyze(stream.text)
    screenname = stream.user.screen_name,
    date = stream.created_at
    ]
}
```

## Sources I will make use of
- https://www.d3-graph-gallery.com/graph/circularpacking_drag.html
- https://www.d3-graph-gallery.com/interactivity.html

## Feedback
Do you think this idea is doable in the given timeframe? Some bears on the road to watch out for?