# encoding: utf-8
"""
"""
from __future__ import unicode_literals
from enums import MagicClasses, MagicTypesEnum
from rand import funcs as random
from consts import STAT_NORMALIZING_FACTOR


class BaseMage(object):
    # Innates
    name = None
    magical_affinity = []
    spells = []
    mage_class = None

    # Level info
    level = 1
    xp = 0

    # Basic stats
    intelligence = 1  # Damage stat for spells
    wisdom = 1  # Harness capacity
    agility = 1  # spells cast on turn
    strength = 1  # Damage stat for attacks
    Endurance = 1 # How many effects you can maintain
    move = 2

    # Stat weighting - how likely the character is to get a stat (baseline)
    stat_weight = {
        'intelligence': 100,
        'wisdom': 100,
        'agility': 100,
        'strength': 100,
        'endurance': 100,
    }

    # Vitality stats
    max_mp = 3
    current_mp = 3
    max_hp = 10
    current_hp = 10

    # damage modifiers
    _resistances = None
    _equipment = None

    def status(self):
        print('Name: {}, Level {} {} mage'.format(self.name, self.level, ' and '.join(self.magical_affinity)))
        print('HP: {}/{}'.format(self.current_hp, self.max_hp))
        print('MP: {}/{}'.format(self.current_mp, self.max_mp))
        print('Stats:')
        print('intelligence: {}'.format(self.intelligence))
        print('wisdom: {}'.format(self.wisdom))
        print('agility: {}'.format(self.agility))
        print('strength: {}'.format(self.strength))
        print('move: {}'.format(self.move))
        print('resistances: {}'.format(self.resistances))
        print('spells: {}'.format(self.spells))

    @classmethod
    def random_mage(cls):
        new_mage = cls()
        new_mage.randomize_name()
        new_mage.randomize_affinity()
        new_mage.randomize_damage_modifiers()
        new_mage.randomize_stats()
        new_mage.randomize_spells()
        return new_mage

    def randomize_name(self):
        self.name = 'Random Name'

    def randomize_damage_modifiers(self):
        # Generate small random damage modifiers for the mage. These won't make a huge deal for the most part.
        resistances = {}
        for magic_type in MagicTypesEnum.choices():
            resistances[magic_type] = random.randint(0, 4) - 2

        for affinity in self.magical_affinity:
            resistances[affinity] += 2

        self.resistances = resistances

    def randomize_spells(self):
        self.spells = ['random']

    def randomize_affinity(self, rand_count=2):
        """
        Give the mage random affinities. Gives them rand_count total affinities. If they already have some, they
        will get that many less.
        :param rand_count:
        :return:
        """
        magic_types = MagicTypesEnum.choices()
        magical_affinity = []
        for existing_type in self.magical_affinity:
            magic_types.remove(existing_type)
            rand_count -= 1

        for _ in range(rand_count):
            magic_type = magic_types[random.randint(0, len(magic_types) - 1)]
            magical_affinity.append(magic_type)
            magic_types.remove(magic_type)

        self.magical_affinity = magical_affinity

    def randomize_stats(self, pool=None):
        """
        Pool of stat points to use. If not set will instead generate a random one.
        Initial stats come from on of 4 possible buckets.
        80% of the time you get 20 to 29 points.
        15% of the time you get 30 to 34
        4% of the time you get 35 to 39, and
        1% of the time you get 40 to 44.
        :return:
        """
        if pool is None:
            pool = random.randint(0, 100)
            if 0 <= pool <= 80:
                pool = random.randint(20, 29)
            elif 80 < pool <= 95:
                pool = random.randint(30, 34)
            elif 95 < pool <= 99:
                pool = random.randint(35, 39)
            else:
                pool = random.randint(40, 44)

        self.assign_stats_from_pool(pool)

    def assign_stats_from_pool(self, pool):
        """
        When gaining a new group of stats, generally as a new mage, we give them based off the weightings for the class
        Some classes will override the default weightings to generally grant new skill points in different areas.
        Uses the stat normalizing factor to smooth the curve to make outlier stats compared the mages weightings less
        common.
        :param pool:
        :return:
        """
        weightings = self.stat_weight.copy()
        for _ in range(pool):
            stat_to_boost = random.weighted_rand(weightings)
            self.__setattr__(stat_to_boost, self.__getattribute__(stat_to_boost) + 1)
            weightings[stat_to_boost] = int(weightings[stat_to_boost] * STAT_NORMALIZING_FACTOR)

    @property
    def resistances(self):
        if self.resistances is None:
            self._resistances = {}

        return self._resistances

    @resistances.setter
    def resistances(self, val):
        self._resistances = val

    def get_resistance(self, res_type):
        return self.resistances.get(res_type, 0)

    def serialize(self):
        """
        Store mage into db
        :return:
        """
        pass

    @classmethod
    def deserialize(cls, id):
        """
        restores and creates a new mage reference based of the id in the database
        :param id:
        :return:
        """
        return cls.random_mage()


    ############### Combat related functions   ################

    def damage(self, amount, damage_type=None):
        # Take damage, subtract resistances. Always deal at least one damage.
        final_damage = max(1, amount - self.get_resistance(damage_type))
        self.current_hp -= final_damage

    def heal(self, amount, heal_type=None):
        # Healing is augmented by resistances. So anything that heals, heals a little better against something resistant
        # to that healing type. Using fire to heal a fire elemental heals more. Using water heals less.
        final_heal = max(0, amount + self.get_resistance(heal_type))
        self.current_hp += final_heal
