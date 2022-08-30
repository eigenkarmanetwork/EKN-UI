# Eigen Trust Network (ETN) UI

Trust is powerful. Knowing who is capable, value aligned, or has done good work in the past is extremely valuable for all sorts of decisions, but currently it takes lots of effort to collect this information. Imagine if you could leverage your trust network's collective knowledge to get a read of hundreds or thousands of times as many people, with minimal effort!

That is what EigenTrust Network is creating. We use an algorithm similar to Google's PageRank to model trust propagation, setting the subjective source of all trust to each individual. So that from your personal view of the network you can see how much of your trust has flowed to anyone else.

This specific repository is for the ETN User Interface or UI. You can view the UI on [our website](http://www.eigentrust.net/).

## How to Use / How it Works

The EigenTrust Network is a tool to help you know who you can trust.  To get started, all you have to do is vote for one person as trustworthy.  The more you vote for a person, the more the system knows you trust them.  The system will then look at the people they trust, and so on, to give you a list of people your network find the be trustworthy and give you a general idea of how much you can trust them.  So if User A trusts User B, and User B trusts User C, User A can see a higher trust score for User C.

### What are Flavors

Flavors are a category of trust.  For example you may trust that someone is a good programmer, and they've made some great products for AGI Safety, so you trust them using the AGI Safety Ecosystem Development flavor.  Now when you look up their trust score in that flavor, you can see one.  However if you look at their AGI Safety Research score it is still zero, as though you trust them to make good programs for the field, you don't know if they produce good research.

#### Types of Flavors

There are three types of flavors: Normal, Composite, and Secondary.

Normal flavors are simple.  If you vote for someone you trust them and who they trust in that flavor.  Composite flavors take the votes from multiple other defined flavors and combine them together.  Secondary flavors are a bit more tricky.

A secondary flavor finds how much you trust everyone in a different defined flavor, then checks to see how much each of those people trust the person you're checking in the actual flavor.  For example, AGI Safety Ecosystem Development is a secondary flavor of AGI Safety Research.  This is because a person who produces quality research can determine who is producing quality ecosystem development.  So when User A checks User B's AGI Safety Ecosystem Development trust score, it will look to see if any of the users User A has trusted with AGI Safety Research trusts User B in AGI Safety Ecosystem Development.
