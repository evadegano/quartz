// # Selects outputs from a UTXO list using a greedy algorithm.

// from sys import argv

// class OutputInfo:

//     def __init__(self, tx_hash, tx_index, value):
//         self.tx_hash = tx_hash
//         self.tx_index = tx_index
//         self.value = value

//     def __repr__(self):
//         return "<%s:%s with %s Satoshis>" % (self.tx_hash, self.tx_index,
//                                              self.value)

// # Select optimal outputs for a send from unspent outputs list.
// # Returns output list and remaining change to be sent to
// # a change address.
// def select_outputs_greedy(unspent, min_value):
//     # Fail if empty.
//     if not unspent:
//         return None
//     # Partition into 2 lists.
//     lessers = [utxo for utxo in unspent if utxo.value < min_value]
//     greaters = [utxo for utxo in unspent if utxo.value >= min_value]
//     key_func = lambda utxo: utxo.value
//     if greaters:
//         # Not-empty. Find the smallest greater.
//         min_greater = min(greaters)
//         change = min_greater.value - min_value
//         return [min_greater], change
//     # Not found in greaters. Try several lessers instead.
//     # Rearrange them from biggest to smallest. We want to use the least
//     # amount of inputs as possible.
//     lessers.sort(key=key_func, reverse=True)
//     result = []
//     accum = 0
//     for utxo in lessers:
//         result.append(utxo)
//         accum += utxo.value
//         if accum >= min_value:
//             change = accum - min_value
//             return result, "Change: %d Satoshis" % change
//     # No results found.
//     return None, 0


// adapted from O'Reilly' book Mastering Bitcoin