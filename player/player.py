# encoding: utf-8
"""
"""
from __future__ import unicode_literals


class Player(object):
    """
    The almost for sure singleton player class that represents the person playing the game.
    """

    gold = 0

    _items = None

    @property
    def items(self):
        if self._items is None:
            self._items = []
        return self._items

    def has_gold(self, amount):
        return amount <= self.gold

    def give_gold(self, amount):
        self.gold += amount

    def remove_gold(self, amount):
        assert self.gold >= amount, "Tried to remove more gold than we had!"
        self.gold -= amount

    def has_item(self, item_name):
        return self.get_item(item_name) is not None

    def add_item(self, new_item):
        self.items.append(new_item)

    def remove_item(self, item):
        item_to_remove = self.get_item(item.name)
        assert item_to_remove, 'Tried to remove an item the player does not have'
        self.items.remove(item_to_remove)

    def get_item(self, item_name):
        """
        Gets an item by name from the inventory
        returns None if no item by that name exists.
        :param item_name:
        :return:
        """
        for item in self.items:
            if item.name == item_name:
                return item
