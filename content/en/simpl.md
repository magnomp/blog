---
    title: SIMPL
    id: simpl
    timestamp: 2026-04-3T14:00:00-3:00
    tags:
        - rest
        - api
---
REST has become so dominant that people treat it as the natural way of building HTTP APIs — not a way, but the way.

I am 100% sure you have already found yourself debating which flavour of `4xx` the API should return in a certain condition, if a given
operation should be a `POST` or a `PATCH` and so on. This is because although REST philosophy makes total sense in theory, in practice any non-CRUD scenario easily fall into a gray area as you are probably talking about _operations_ on an application's domain, but REST demands that you treat it like _resources_.

<!--more-->

A missing mandatory property is a `400` or `422`?
And a "not enough money for a bank transfer"?

Whatever your answers: the point is that both cases can be interpreted as either. And I'm sure you've debated this with colleagues before.

Here is another example: When selling a product to a customer, what do you return if customer is not found? `404` seems to be the obvious answer, but now what if
_the product_ is not found? `404` starts to be ambiguous and you have to rely on the body to give details (let's go back on it later).

What teams usually do is create standards (albeit implicit) on which classes of errors are returned as `400` and which ones are `422` or other `4xx` but this is just a team's convention, just like the team is also likely to have a convention for paths and sub-resources, HTTP verbs, etc.

The main point here is: Even though teams claim they are doing REST, they aren't. They have their own standard on top of it, their own flavour of REST.

So if every team ends up with their own flavor anyway, why not be intentional about it and define a standard for APIs over HTTP?

One which is built from the ground up acknowledging that HTTP is no more than a super convenient, reliable, widespread and easy to use _transport layer_, but without any commitment to arranging the application domain into a world of resources?

One that different teams from different companies can sit together and speak the same language (well, this is what REST was supposed to be)?

One which is ~~simple~~ `SIMPL` enough that one doesn't have to spend a semester just to understand the standard?

## Make intents explicit (HTTP verbs ain't enough)

HTTP verb + resource isn't enough to express intent. Instead, `SIMPL` wants you to have the operation explicit on the path.

See, when you request a `delete /customers/:id` do you want to block the customer, or soft-delete it or maybe obliterate (hard delete) it?

The `SIMPL` way would have the operation clear on the path, so
- `post /customers/:id/block`
- `post /customers/:id/remove`
- `post /customers/:id/forget`

Now what if you want to set a customer as active?

```
patch /customer/:id
{ active: true }
```

Although internally it is probably not as simple as just updating a db column (I mean, validating the change, firing messages, emails, related tables, etc) this endpoint lacks intent and seems just a simple property update.

A `post /customer/:id/activate` is way more informative.

Too verbose for the CRUD cases, no? Indeed. For simple, crud-like operations, we can think of the intent as being implicit and yet being well understood. Some examples:

- `get /customer/:id` Return a view of the customer identified by `id`
- `post /customer` Create a customer
- `get /customer` List customers

You could say that `delete /customer/:id` would fit here. At first glance, yes, but the `delete` is inherently problematic/ambiguous as we saw above so let's keep it out for good.

Putting everything together, we have:
- `get` for queries.
- `post` for mutations.

And that's it. No `put`/`patch`/`delete`/etc.

### Path parameters vs Query strings vs Request body

Prefer path parameters to specify the target of the action (be it a query or any mutation).

Leave the query string or request body (depending if it is a `post` or a `get`) to extra arguments like filtering and sorting specifiers, toggles or any other parameter which is not there to identify the target entity.

The reason? The path parameters are first class citizens in logs. Query string and response body are not always logged, and even if they do, what is at the first sight is always the path.

There are cases, however, that you would need many or even a variable number of attribute to specify the target (eg, bulk actions with a target filter). In this case, it is ok to put the identification on the query string or request body.

As a general rule, I would say to put the identification on the path if it is one or two (not more) _fixed_ and _primitive_ values.

## Make errors explicit (Fewer status codes are better)

Similar to HTTP verbs, status codes alone are not enough to represent all possible outcomes of a rich application domain.

Going back to the `404` example above:

```
post /purchases
{
	customerId: xxx
	productId: yyy
}

Response: 404
```

What was not found? The customer? The product? (The money for paying the bill?) you _have_ to rely on the response body to answer the question, which can be:
```
{ error: product-not-found }
// or
{ error: customer-not-found }
// or
{ error: not-enough-balance }
```

But even doing so, traditionally you would still have to decide which status code to use and even engage in debates with colleagues about that. So let's simplify and assume that response codes, on `SIMPL` philosophy, are not going to tell you _what_ went wrong, at most it will give you a few classes to sit your response in, such that:
- The intent was fulfilled
- The intent was not fulfilled because of an error on the client application
- The intent was not fulfilled because of invalid input from the user
- etc

This gives you a few, strongly defined rules, which you and your colleagues can easily agree on without ambiguities.

In any case, the details about what happened, what went wrong, is _always_ on the response body.

That said, we adhere to only those codes:
- 200 Intent fulfilled
- 404 Endpoint not found
- 400 Bad request due to a bug in the caller. Something the caller could easily validate to prevent the request from happening (eg: required fields, email format)
- 422 Things the caller could not prevent as this would require deeper knowledge of business rules or validations that cannot be done on their end.
- 401 Unauthorized. User is not authenticated or authentication expired
- 403 Forbidden. User is authenticated but they simply have no access rights to do the required operation
- 500 Any unexpected error on the server
- Other codes may be added by other parties, eg api gateway doing rate limiting, etc

## Wait, what?

I understand this may sound too disrupting so let's discuss a few common pain points

### Do not return 404 on entities not found

For simple things like the "get a customer" -> "customer not found" scenario, the `404` works fine.

It is well understood that it means something not found, which in this case is the customer. No debates would be set up around this. But real applications are never so simple, are they?

There will be scenarios out there for which you would think whether `404` is the correct alternative or it should be a `422`. Or even that the `404` alone, even though valid, is not enough for describing _what_ was not found and details have to go via response body.

The point here is: We don't want the ambiguity of returning `404` on simple cases and `422` on others, because how do we define the limits? Ambiguities and discussions is precisely what we want to avoid here, and since `404` isn't a good fit for so many cases (for reasons already discussed), let's drop it.

I propose an exercise: For an api consumer, what benefit would `404` add over `422` for the api consumer, given that this api consumer is dependent on proper error details embedded on the response body anyway?

### Do not use DELETE verb to remove stuff

Because usually we are not deleting things, or at least not only deleting things.

Deleting stuff may involve triggering emails, synchronizing other parts of the system, cascadings, etc, and in the end many times the thing is not even deleted, but gets a flag like `archivedAt` set.

This is semantically weird and that weirdness may end up in debates and in variations which is the point we try to avoid.

As for the `404`, it may make total sense for really simple cases, but again, we don't want to establish a rule for simple things and another for the complex ones because how would one define the limits?

### What about cacheability?

Standard cache mechanisms for HTTP were built around the resources concept. In a rich application, only the application knows what to cache and when to invalidate so it's the application which should manage cache internally, and not the browser or a proxy.

### The resource idiom

Both the `404` status code and the `DELETE` verb are resource idioms. They make total sense in a world of resources, which is what HTTP was conceived for initially, but they simply do not make sense in an _operations_ world. We were taught to force them to fit, so now it feels weird/non-natural to do it differently.

### Yet another RPC over HTTP?

Over the years there were a few standards on doing RPC over HTTP, using it just as a transport layer. The problem with those is that they are usually too verbose or require extra tooling for both serving and making requests. One really good point for REST or "REST flavours" is that once you understand the standards you just sit and start making requests via `curl` or any plain http client. This is because REST is really close to HTTP and does not create a complex envelope for the request treating the HTTP as a really dumb layer, differently from `SOAP` or `GraphQL`

In `SIMPL`, HTTP is indeed just a transport, but we are still close to it and any `SIMPL` request is really close to how HTTP was intended to be used (besides our specific choices for verbs, codes, etc).

# Out of scope: Response body

We haven't discussed specific body shapes for things like errors and pagination. Though those are relevant topics and deserve to be standardized to some degree, they are simply outside `SIMPL`'s scope. So, just do whatever fits better for your needs.

## In summary

Here is a brief resume of what we discussed

### Verbs

- `GET` for queries
- `POST` for mutations

### Status codes

- 200 Intent fulfilled
- 404 Endpoint not found
- 400 Bad request due to a bug in the caller. Something the caller could easily validate to prevent the request from happening (eg: required fields, email format)
- 422 Things the caller could not prevent as this would require deeper knowledge of business rules or validations that cannot be done on their end.
- 401 Unauthorized. User is not authenticated or authentication expired
- 403 Forbidden. User is authenticated but they simply have no access rights to do the required operation
- 500 Any unexpected error on the server
- Other codes may be added by other parties, eg api gateway doing rate limiting, etc

### Path

Have the intent explicit, unless it is a simple CRUD operation

#### Path parameters, query strings and request body

- Path parameters identify the target of the intent
  - Only if it fits in no more than two fixed and primitive keys
- Everything that does not qualify for path parameter, goes on:
  - Query string if it is a `GET`
  - Request body if it is a `POST`