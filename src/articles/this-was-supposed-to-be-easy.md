January 15, 2017

# Adventures in Tech Blogging

Or, _This Was Supposed To Be Simple_

I just wanted to have a little place to write a blog.  My requirements
were simple:

0. Author entries in Markdown
0. Host statically via github.io, AWS CloudFront, whatever
0. Push to Github == Publish

Keep in mind that I don't expect anyone to actually _read_ my blog. The effort
spent setting it up and operating it should be minimal.  If I have to learn
any new tech, it had better be tech I can also use to develop _useful_ things.

## Jekyll Fail

I learned that *github.io* would automatically publish anything pushed
to a particularly-named repo, so that made sense as the first attempt. I'd
have to learn something called _Jekyll_ but, hey, it's Github. They would
never make anything hard to use. I already had some experience with Github
project pages using hand-authored HTML and that had worked fine.

I started digging and learned that Jekyll is, um, _capable_. It can do
most anything as far as I can tell but it has a big spec with much Ruby-ness
and I just want to write a blog that nobody will read. I found [this little
gem](http://jekyllbootstrap.com/) (ha!) and, as promised, I had a blog up
on GH pages in less than three minutes. And there was a CLI. And the entries were _markdown_! My word, this was going to be awesome.

Until I tried to change the theme. It may shock you but Ruby on OSX is
a hot mess. It is probably not Ruby's fault but Lordy is it _complicated_
to get dependencies working on a Mac. I had `brew install`ed Ruby when
I first got the MacBook and maybe that was the mistake. Tl;dr the
dependencies could not be resolved through any of my experiments nor after
hours of Googling.  When it started looking like I'd have to become a Ruby expert, I threw it in.

## Create React App

I had played around with
[create-react-app (CRA)](https://github.com/facebookincubator/create-react-app)
in the past and I really wanted to learn React + Redux since that's what
all the cool kids at work are doing so maybe this was a good opportunity
for synergy.
<iframe width="560" height="315" src="https://www.youtube.com/embed/GyV_UG60dD4" frameborder="0" allowfullscreen></iframe>

It was easy to set up and getting Redux working wasn't too hard.
It was actually pretty cool. Some text came from a _store_ and it was
modified through a _reducer_ that responded to an _action_. All was good,
I went to add the first article.

## You Must Eject

I learned a little secret about CRA: it doesn't want to be configured. In
one sense, that makes it _really really great_ if your app fits its opinions.
But one of those opinions is, "web applications are generated from
Javascript and JSX."  It's not a bad opinion, lots of web apps _are_ generated
from Javascript and JSX. Just not mine. I needed Markdown.

Markdown sources can be imported via a custom loader. To configure a custom
loader, you edit the Webpack configuration. But CRA doesn't let
you edit the Webpack configuration--the Webpack conf is brought in via NPM.
To edit the configuration you have to _eject_. You run a simple command,
`npm run eject`, and CRA hydrates your configuration so you can edit it. But
once the training wheels are off, you can't put them back. You are the
maintainer now.

So that's what you're reading now, the first entry in a blog published
through an ejected create-react-app. It hasn't been so bad and in the
end I'll probably learn quite a bit about Webpack and its ecosystem.
I figured out how to get it to find all the articles and how to turn
them all into ugly HTML. I'm looking forward to learning more React
and Redux for this and other projects and I'll try to share some things
along the way.
