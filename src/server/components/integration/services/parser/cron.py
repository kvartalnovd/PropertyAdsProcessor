from typing import Tuple

from components.integration.services.parser.engines.core import ParserEngineCore
from components.integration.services.parser.engines import Ss, MyHome

class ParserCron:

    def __init__(self):
        self.__engines: Tuple[ParserEngineCore] = (Ss, MyHome)

    def run(self):
        for engine in self.__engines:
            engine.smartparse()