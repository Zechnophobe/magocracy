# encoding: utf-8
"""
"""
from __future__ import unicode_literals
from character.npc import BaseNPC


class Visitor(BaseNPC):
    """
    A visitor is an NPC that shows up in your guild. All are 'technically' mages, though this will rarely matter
    Some will offer their services to the guild, in which case they become standard mages.
    """
    name = 'Special Guest'

    # How many days will they stay?
    duration = 1
    description = 'A visitor'

    def chat(self):
        return 'Hello, nice guild you have here'







