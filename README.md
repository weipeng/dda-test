# dda-test
Two simple games to demonstrate the use of the Partially Ordered Set Master algorithm for dynamic difficulty adjustment in games.

The algorithm is first described in:

Missura, O., & Gärtner, T. (2011). Predicting dynamic difficulty. In Advances in Neural Information Processing Systems (pp. 2007-2015).

The implementation is in https://github.com/nrobb/dda-test/blob/gh-pages/posm/Posm.js

Known issues:
1. This version always starts with the middle value in the difficulty settings array. It would be better if the index of the starting setting could be specificed when initializing the posm object.
2. The algorithm works by multiplying each setting's belief by the learning rate. This version always uses a learning rate of 0.75. Eventually, this will produce very small numbers, which might not be efficient or robust.
