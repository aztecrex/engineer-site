January 17, 2017

# Host Easy

Or, _You too can have a website for only micro-pennies a day_

## Goodbye GitHub Pages

Once I decided to make this site a React + Redux thing, I started
to question GitHub pages as a host. With GH pages, my site would
have to be https://aztecrex.github.io which isn't _horrible_ but
I'm questioning the whole Aztec Rex thing anyway. I mean, it was
funny when the movie aired but really, should it be my developer
identity for _ever_?

I've owned _gregwiley.com_ for a while now. Maybe it should be the
domain for my site (yeah, _duh_). To do that I needed to host
the site on not-GitHub. Most everything I write runs on AWS so
that seemed like the logical choice. Also, I had just helped a
co-worker get a static site running on S3 + CloudFront so the configs
were fresh in my mind.

<iframe width="560" height="315" src="https://www.youtube.com/embed/tDacjrSCeq4" frameborder="0" allowfullscreen></iframe>

## Be Devopsy

I want everyone to have a happy, carefree developer life so here
is some important advice you will probably ignore to your eternal
peril: _never use the AWS console to provision anything_.

Provisioning through individual CLI commands is nearly as
bad.

You must learn to _script_ your infrastructure. It is painful to
learn, but the first time you are able to completely tear down
all the things and re-create them with a single command, the
veil will be lifted and you will sing, no, dance at the wonder
of the world. You will be able to make _incremental_ changes
without fear, knowing you can revert at the speed of Git.

I don't care how you do it, use the AWS SDK for your favorite
language, use CloudFormation, download the latest whiz-bang
cloudkit. Just don't keep any of the details of your infrastructure
in your _brain_.

Your brain is needed to develop software, start a company, or
write a screenplay. If you use part of your brain to store
infrastructure details, you are robbing the world of your best
self.

## CloudFormation

For this project, I decided to use CloudFormation. CloudFormation
is as low-level you can get for AWS devops but it can express
most any architecture you can imagine. For the engineer site,
I would need essentially three resources in a CloudFormation template:

* An S3 Bucket to hold the content
* A CloudFront distribution to serve the content
* A Route53 domain for a friendly URL.

The final code is in the `/deploy/infrastructure.yml` but the initial
template consisted of 4 resources:

### Origin

_Origin_ is the S3 bucket that will store the site content. An
S3 bucket is just a transactional object store. You put arbitrary, named
hunks of data into it and retrieve them for whatever purpose you need them.
In this case, the bucket holds the contents of the `/build` directory
created by Webpack when `npm run build` is run.

### CDN

_CDN_ is the CloudFront distribution. A distribution is not necessary to
serve web content, you can do that with S3 directly, but it has some
advantages:

* you can use any domain you want.  If you want to use your own domain
with S3 alone, you have to name the bucket with your domain. Since
bucket names are unique across all of AWS, it is possible someone
already has a bucket using your domain name, preventing you from using
it
* you get a capable _content delivery network_ that caches your content
to edge locations near your users. You generally get more consistent
performance through CloudFront than from S3 directly even if you don't
really need the caching benefit
* it can be a little cheaper. It's not much difference but AWS has
made cached delivery a better financial proposition than delivery
direct from S3.

I chose to use CloudFront because I dislike the need to name a bucket
according to my domain but it might have been more than I needed.

### Domains

Domains creates two DNS resource records in AWS _Route 53_. It creates
an A record for _gregwiley.com_ and a CNAME for _www.gregwiley.com_.

The A record is an _alias_ record. Aliases are a feature of Route 53
that allow an A record to point to a potentially changing IP address.
In the case of CloudFront, the IP addresses can change as Amazon sees
fit. An alias ensures that the A record remains valid at all times.

The CNAME record simply points to _gregwiley.com_, ensuring better
reachability for the site.

### OriginAccessPolicy

This is where my template diverges from others you may find out there.
I chose to use an _Origin Access Identity (OAI)_ so that I could limit
the access to the Origin bucket to only CloudFront. Many tutorials
instead advise that the bucket be made _public read_ to avoid the
need to configure CloudFront authorization. I don't like the idea
of access outside of the design so I chose to lock it down.

The trouble is that, after all these years, AWS still doesn't allow you
to provision an OAI through CloudFormation. So I created a single
OAI through the CLI, then captured it in the template defaults. In a future
revision I may develop a custom CloudFormation resource to do this.

## Final Touches

For SEO (don't laugh), I wanted access to occur through only one domain. So if someone typed _www.gregwiley.com_ or a browser tried to be helpful
and assume that domain, I wanted the browser to be redirected to
_gregwiley.com_.

I didn't want to spin up a server (hourly charges) to do the redirect
so I used a built-in capability of S3. S3 allows you to
redirect _every request_ to a prescribed URL. It would mean dedicating
a bucket to the purpose but there would be no additional cost sine
nothing would be stored in it.  I added two new resources to the
template, _RedirectOrigin_ and _RedirectDistribution_. The first is
a bucket configured to redirect all requests to _gregwiley.com_. The
second is a CloudFront distribution to front it with the www domain.

Another method would have been to use the redirect rules capability
of S3 but that is more than is needed for this simple feature.

Finally, I had to point the two domains to the two separate CloudFront
distributions.

## Provision

To bring up all the infrastructure now just requires a single
AWS CLI command:
`aws cloudformation create-stack --stack-name engineer-site --template-body file://infrastructure.yml`

To update the infrastructure after modifying it:
`aws cloudformation update-stack --stack-name engineer-site --template-body file://infrastructure.yml`

I can even bring it up with a different stack name (providing
a different domain name parameter) to test new configurations before
making those changes on the real site.

The template requires that the domain is already hosted in Route53
and that I have provisioned an Origin Access Identity but, other than
that, it's really easy to use.

## But It's Not Free

Cost is an important consideration choosing a hosting architecture.
The GitHub Pages option was free but in this design, there will
be a few service costs

### Storage

S3 storage is billed monthly based on how much data is
stored. For US standard storage, the cost is $.023 per GB-month
in 128KB-month increments. With the Webpack JS maps, my site is
currently 2.1MB which puts me at about $.005 per month for
storage.

### Data Transfer

Data transfers in to S3 used to be charged the same as transfers
out but now transfers in are free.

Data transfers to CloudFront are also free.   

### Content Delivery

CloudFront charges are the only cost that depends on traffic. For
delivery to North America and Europe, the cost is $.085 per GB.
That's a little less than the $.09 per GB for non-CloudFront
delivery direct from S3 to those same regions.

Delivery to East Asia and Australia is $.14 per GB, India $.17 per GB,
and South America, $.25 per GB. Volume pricing is available but these
are good numbers for planning a small site.

## Metrics

I added a story to the backlog to start capturing metrics.
The delivery cost makes measurement important. If hardly anyone
visits the site, it will not matter but if costs start to go up,
I'll want insight about usage.


Get the code for this site on
[GitHub](https://github.com/aztecrex/engineer-site).
