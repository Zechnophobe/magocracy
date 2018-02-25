# encoding: utf-8
"""
"""
from __future__ import unicode_literals


# When a mage is generated, this is how quickly the weight of a stat goes down to be gained again
# If set to 0.9, then every time a mage gains one point of stat during creation it will be 90% as likely to gain
# that stat again for the remainder of generation time. Has no affect on levelling up. Numbers above 1 will cause
# mages to be MORE specialized than normal, values below 1 will make them a little more nromal.
STAT_NORMALIZING_FACTOR = 0.9
