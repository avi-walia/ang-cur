Ionic App Base
=====================

A starting project for Ionic that optionally supports using custom SCSS.

## Using this project

We recommend using the [Ionic CLI](https://github.com/driftyco/ionic-cli) to create new Ionic projects that are based on this project but use a ready-made starter template.

For example, to start a new Ionic project with the default tabs interface, make sure the `ionic` utility is installed:

```bash
$ npm install -g ionic
```

Then run: 

```bash
$ ionic start myProject tabs
```

More info on this can be found on the Ionic [Getting Started](http://ionicframework.com/getting-started) page and the [Ionic CLI](https://github.com/driftyco/ionic-cli) repo.

## Issues
Issues have been disabled on this repo, if you do find an issue or have a question consider posting it on the [Ionic Forum](http://forum.ionicframework.com/).  Or else if there is truly an error, follow our guidelines for [submitting an issue](http://ionicframework.com/submit-issue/) to the main Ionic repository.


=================================
Android SPECIFIC ISSUES & RESOLUTIONS
=================================
Android does not need a ssl certificate installed to run on dev. However, it does need the cordova whitelist plugin installed:
ionic plugin add https://github.com/apache/cordova-plugin-whitelist.git


=================================
IOS SPECIFIC ISSUES & RESOLUTIONS
=================================

// ADD TO APPDELEGATE.M

@implementation NSURLRequest(DataController)
+ (BOOL)allowsAnyHTTPSCertificateForHost:(NSString *)host
{
    return YES;
}
@end

=================================
OTHER ISSUES & RESOLUTIONS
=================================
- Remove ionic css folder because it overwrites our custom css styles. Removing seems to work and doesn't seem to have any consequences
- Remove bootstrap ui css