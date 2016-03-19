# encoding: utf-8
"""
"""
from __future__ import unicode_literals
import random


def weighted_rand(options):
    """
    each key in options is a possible return, and each value is the weighting of that option.
    :param options:
    :return:
    """
    total = 0
    for val in options.values():
        total += val

    choice_index = random.randint(1, total)

    pointer = 0
    for key, value in options.items():
        pointer += value
        if choice_index <= pointer:
            return key


def randint(start, end):
    return random.randint(start, end)