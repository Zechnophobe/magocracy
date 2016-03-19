# encoding: utf-8
"""
"""
from __future__ import unicode_literals


class BaseItem(object):

    name = ''
    item_type = ''
    cost = 0
    equip_location = None  # If no equip location, is considered consumable
    description = ''
    can_use = False

    resistances = None
    damage_bonus = None
    heal_bonus = None

    def on_use(self):
        """
        When used, what does the item do?
        :return:
        """
        assert self.can_use, 'Used an unuseable item!'