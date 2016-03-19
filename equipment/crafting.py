# encoding: utf-8
"""
"""
from __future__ import unicode_literals
from equipment.item import BaseItem
from rand.funcs import weighted_rand


class BaseCraftingRecipe(object):
    _item_pool = None
    _gold_cost = None
    _ingredient_cost = None

    @property
    def gold_cost(self):
        if self._gold_cost is None:
            self._gold_cost = [1, 10, 100]
        return self._gold_cost

    @property
    def ingredient_cost(self):
        if self._ingredient_cost is None:
            self._ingredient_cost = []
        return self._ingredient_cost

    @property
    def item_pool(self):
        if self._item_pool is None:
            self._item_pool = {}
        return self._item_pool

    def can_afford(self, player, tier):
        if player.gold >= self.gold_cost[tier]:
            for item in self.ingredient_cost:
                if not player.has_item(item):
                    return False
            return True

    def craft_recipe(self, player, tier):
        """
        When you craft a recipe, depending on tier, you have a higher chance of getting the better version of items.
        We take the normal weighting matrix and add 20 * tier to all weightings. For example if weights were 5, 10, 15
        and the tier was 1, the new weightings would be 25, 30, 35. Getting the best item is now a 25/90 instead of 5
        out of 30. If you used tier 2, it would be 45, 50, 55, or 45/150
        :param player:
        :param tier:
        :return:
        """
        assert self.can_afford(player, tier), 'Tried to craft an item the player could not afford!'
        self.pay_price(player, tier)

        rand_modifier = tier * 20
        item_pool = self.item_pool.copy()

        for key in item_pool.keys():
            item_pool[key] += rand_modifier

        return weighted_rand(item_pool)

    def pay_price(self, player, tier):
        player.remove_gold(self.gold_cost[tier])
        for item in self.ingredient_cost:
            player.remove_item(item)


class FireStaffRecipe(BaseCraftingRecipe):
    _item_pool = ['FireStick', 'FireWand', 'FireBrand']
    _gold_cost = 100
    _ingredient_cost = ['stick', 'fire_essence', 'red_crystal']
