January 15, 2017

# Adventures in Tech Blogging

Or, _This Was Supposed To Be Simple_

I just wanted to have a little place to write a blog.  My requirements
were simple:

0. Author entries in Markdown
0. Host statically via github.io, AWS CloudFront, whatever
0. Push to Github == Publish

Keep in mind that I don't expect anyone to actually _read_ my blog. There
will never be anything all that important on it so the effort
I spend setting it up should be minimal.  If I have to learn any new
tech, it had better be tech I can use in developing _useful_ things as
well as my blog.

## Jekyll Fail

Since I read that *github.io* would automatically publish anything I pushed
to a particularly-named repo, that made sense as the first attempt. I would
have to learn something called _Jekyll_ but, hey, it's Github. They are
so cool and would never make anything hard. I already had some experience
with Github pages using hand-authored HTML and that had worked.

I started digging and learned that Jekyll is, um, _capable_. It can do
most anything as far as I can tell but it is a big spec with much Ruby-ness
and I just want to write a blog that nobody will read. I found [this little
gem](http://jekyllbootstrap.com/) (ha!) and, as promised, I had a blog up
on GH pages in less than three minutes. And there was a CLI. And the entries were _markdown_! My goodness, this was going to be awesome.

Until I tried to change the theme. This may shock you but Ruby on OSX is
a hot mess. This is probably not Ruby's fault but Lordy is it _complicated_
to get dependencies right on a Mac. I had `brew install`ed Ruby when
I first got this MacBook and that may have been a mistake. Tl;dr the
dependencies could not be resolved through any of my own work nor after hours
of Googling.  When it started looking like I'd have to become a Ruby expert,
I decided to call it.

## Create React App

I had played around with
[create-react-app (CRA)](https://github.com/facebookincubator/create-react-app)
in the past and I really wanted to learn React + Redux since that's what
all the cool kids at work are doing so maybe this was a good opportunity
for synergy.
<iframe width="560" height="315" src="https://www.youtube.com/embed/GyV_UG60dD4" frameborder="0" allowfullscreen></iframe>

It was really easy to set up and getting Redux working wasn't too hard.
It was pretty cool. Some text that came from a _store_ and it was
modified through a _reducer_ that responded to an _action_. All was good,
I went to add the first article.

## You Must Eject

I learned a little secret about CRA: it doesn't want to be configured. In
one sense, that makes it really really great if your app fits its opinions.
But one of those opinions is, "web applications are generated from
Javascript and JSX."  It's not a bad opinion, lots of web apps _are_ generated
from Javascript and JSX. Just not mine. I needed Markdown.

Markdown sources can be imported via a custom loader. To configure a custom
loader, you edit the Webpack configuration. But CRA doesn't let
you edit the Webpack configuration--that is brought in via NPM. To edit the
configuration you have to _eject_. A simple command, `npm run eject`,
hydrates your configuration so you can edit it. But once the training
wheels are off, you can't put them back. You are the maintainer now.

So that's what you're reading now, the first article in a blog published
through an ejected create-react-app. It hasn't been so bad and in the
end I'll probably learn quite a bit about Webpack and its ecosystem.
I figured out how to get it to find all the articles and how to turn
them all into ugly HTML. I'm looking forward to learning more React
and Redux for this and other projects and I'll try to share some things
along the way.
