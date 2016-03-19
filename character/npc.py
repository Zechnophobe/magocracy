# encoding: utf-8
"""
"""
from __future__ import unicode_literals
from character.mage import BaseMage


class BaseNPC(BaseMage):
    name = 'Stranger'

    def chat(self):
        """
        What happens when you talk with this NPC
        :return:
        """
        return 'Hello'


class Merchant(BaseNPC):
    name = 'Merchant'

    inventory = {}
    item_pool = []  # Types of items its inventory will pull from, and types of items it will buy
    money = 100

    def begin_shopping(self):
        """
        Bring up the shopping interface with the current inventory for this merchant, and the merchants current money.
        :return:
        """
        pass

    def chat(self):
        self.begin_shopping()

    def buy_item(self, item):
        assert item in self.inventory, 'Attempted to buy an invalid item'
        del(self.inventory[item])

