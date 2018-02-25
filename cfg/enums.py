# encoding: utf-8
"""
"""
from __future__ import unicode_literals


class BaseEnum(object):

    @classmethod
    def choices(cls):
        things = []
        for attribute in dir(cls):
            if not attribute.startswith('__') and type(getattr(cls, attribute)) == str:
                things.append(getattr(cls, attribute))
        return things


class MagicTypesEnum(BaseEnum):
    EARTH = 'earth'
    AIR = 'air'
    WATER = 'water'
    FIRE = 'fire'
    DARK = 'dark'
    LIGHT = 'light'


class MagicClasses(BaseEnum):
    ENCHANTER = 'enchanter'
    ILLUSIONIST = 'illusionist'
    ALCHEMIST = 'alchemist'
    HOLY = 'holy'
    ARTIFICER = 'artificer'
    ELEMENTAL = 'elemental'
    BATTLE = 'battle'
    SWORD = 'sword'
    SHIELD = 'shield'
    TECHNO = 'techno'
    DRUID = 'druid'
    SUMMONER = 'summoner'
    FIRE = 'fire'
    WILD = 'wild'
