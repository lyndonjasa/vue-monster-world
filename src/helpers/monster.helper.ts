import useSpriteFactory from "@/hooks/useSpriteFactory";
import { DetailedMonsterResponse } from "@/http/responses/detailed-monster.response";
import { BattleMonster } from "@/models/monster/battle-monster";
import { DetailedMonster } from "@/models/monster/detailed-monster";
import { MonsterTeamEnum } from "@/models/monster/monster-team.enum";
import { ElementEnum } from "@/models/skills/element.enum";
import { Skill } from "@/models/skills/skill";
import { SkillTypeEnum } from "@/models/skills/skill-type.enum";
import { TargetEnum } from "@/models/skills/target.enum";

export const convertResponseToModel = (response: DetailedMonsterResponse[]): DetailedMonster[] => {
  const model: DetailedMonster[] = [];
  const responseSprites = response.map(r => r.sprite);
  const { sprites } = useSpriteFactory(responseSprites);

  const attackSkill: Skill = {
    cost: 0,
    name: 'Attack',
    power: 45,
    skillType: SkillTypeEnum.DAMAGE,
    ignoreDefense: false,
    skillTarget: TargetEnum.ENEMY,
    skillElement: ElementEnum.NON_ELEMENTAL
  }

  response.forEach(r => {
    const monster: DetailedMonster = {
      _id: r._id,
      currentExp: r.currentExp,
      element: r.element,
      expToLevel: r.expToLevel,
      level: r.level,
      name: r.name,
      computedName: r.computedName,
      sprite: sprites.find(s => s.name === r.sprite.name),
      stats: r.stats,
      talents: r.talents,
      talentPoints: r.talentPoints,
      skills: [
        { ...attackSkill },
        ...r.skills.map(s => {
          return {
            cost: s.cost,
            ignoreDefense: s.ignoreDefense,
            name: s.name,
            power: s.power,
            skillElement: s.skillElement,
            skillTarget: s.skillTarget,
            skillType: s.skillType,
            penalty: s.penalty,
            statusEffect: s.status
          }
        })
      ]
    }

    model.push(monster);
  })

  return model;
}

export const convertToModelForBattle = (model: DetailedMonster[], team: MonsterTeamEnum): BattleMonster[] => {
  return model.map(m => {
    return {
      ...m,
      team,
      appliedStatus: []
    }
  })
}

export const getMonsterThumbnail = (name: string) => {
  return require(`@/assets/thumbs/${name.replace(/\s+/g, '')}.jpg`);
}

export const descriptionDictionary: { name: string, description: string }[] = [
  {
    name: 'AeroVeedramon',
    description: `a Holy Dragon Digimon. Veedramon digivolved further, and as AeroVeedramon, 
      it became able to move through the sky. Among the rare species of Veedramon, it is said 
      that only veteran warriors that have come through frequent battles are able to digivolve, 
      so its existence is already becoming a legend.`
  },
  {
    name: 'Agumon',
    description: `a Reptile Digimon. It has grown up and become able to walk on two legs, and has an 
    appearance like a tiny dinosaur. Because it is still on the way to adulthood, its power is low, but as 
    its personality is quite ferocious, it doesn't understand fear.`
  },
  {
    name: 'Alphamon',
    description: `a Warrior Digimon and a carrier of the X-Antibody. While it is one of the "Royal Knights", 
    it is said that, to the Holy Knights, it is a being similar to a deterrent force, and as it doesn't appear 
    in normal times, it is also called the "Aloof Hermit" who flutters a blue mantle, and is the Royal Knight 
    assigned to the place called the "Empty Seat".`
  },
  {
    name: 'Andromon',
    description: `an Android Digimon. It possesses a fighting strength which can fell a Digimon below Ultimate in a single blow. 
    It was developed as a prototype for Cyborg Digimon. Its technology was also appropriated for MetalGreymon. As a prototype 
    Digimon, it possesses neither will nor emotion, so it is faithful to its programmed behavior.`
  },
  {
    name: 'BaoHackmon',
    description: `a Dinosaur Digimon. It is a form of Hackmon that has gone through strict training, intensifying its 
    sense of combat incomparably and achieving growth mentally, technically, and physically. It is a combat expert that aims 
    for the top, continuing its training, accumulating combat experience cultivated through battle with formidable opponents, 
    and digivolving as it battles.`
  },
  {
    name: 'Betamon',
    description: `an Amphibian Digimon. It walks on four legs. Its personality is gentle, but although it is a 
    docile Digimon, once Betamon is angered, it emits its "Electric Shock" from its body.`
  },
  {
    name: 'Aquilamon',
    description: `a Giant Bird Digimon. It has two gigantic horns growing from its head. It is called the "Great Eagle 
    of the Desert", and as it flies through the sky at Mach speed, it possesses the eye strength to locate the opponent 
    from a very great distance. The horns on its head, when it glides from a great height and charges the opponent, exhibit 
    an immense might.`
  },
  {
    name: 'Angemon',
    description: `an Angel Digimon. It has six shining wings, and its body is clad in cloth so pure white as to be divine. 
    It is a being of perfected virtue, and although it is called a Digimon that brings happiness, when confronting evil, 
    it does not stop attacking, with extreme composure, until the opponent is completely annihilated.`
  },
  {
    name: 'Dorugamon',
    description: `an Animal Digimon and a carrier of the X Antibody. It is a ferocious Digimon that possesses 
    the disposition of a beast and a dragon, and is such a heavyweight that most Digimon run away just at the 
    sight of its shadow. Although it exhibits that ferocity of a wild beast when it comes to battles, it also has the 
    intelligence of a dragon, and is usually very docile.`
  },
  {
    name: 'DoruGreymon',
    description: `an Animal Digimon and a carrier of the X Antibody. It is a massive Digimon whose form was released 
    through the Interface on its brow by the potent life-force data of the legendary beast, the "Dragon", which slept 
    within the deepest parts of its DigiCore, and that holds the alias of "Final Enemy".`
  },
  {
    name: 'Dorumon',
    description: `an Animal Digimon and carrier of the X-Antibody. Because it has an old-style interface on its brow, 
    it is presumed to be an experimental "Prototype Digimon" from before Digimon were discovered. The personality of natural 
    Combat Species Digimon manifests particularly strongly within it, so its combat instinct is high, and it often barks 
    and snaps at everything.`
  },
  {
    name: 'Duftmon',
    description: `a Holy Knight Digimon. It is acknowledged even by the other Royal Knights as their foremost strategist. 
    It has the invaluable ability to lead the Royal Knights, who each possess a dogma that they believe in. Its own motto is 
    "Justice equals power".`
  },
  {
    name: 'Dynasmon',
    description: `a Warrior Digimon. One of the "Royal Knights", it possesses the powers of the wyvern. It is a unique 
    being among the Royal Knights, in that it serves the lord who embodied its own sense of justice with deep, unquestioning 
    loyalty. For example, for the sake of its own justice, it won't hate its lord even if they are called "Evil".`
  },
  {
    name: 'Etemon',
    description: `a Puppet Digimon. It is an unidentified Digimon that suddenly appeared in the Digital World. It calls itself the "King of Digimon", 
    and its fighting strength is beyond imagination.`
  },
  {
    name: 'Examon',
    description: `a Holy Knight Digimon. One of the "Royal Knights", it possesses an extraordinary data size, so traditional 
    digital tools were unable to completely render it, and its existence was discovered because it finally became 
    possible to render it with the use of state-of-the-art digital tools. Though it belongs to the Royal Knights, it is 
    simultaneously a being which stands at the top of all Dragon Digimon, and holds the alias of "Dragon Emperor".`
  },
  {
    name: 'Gabumon',
    description: `a Reptile Digimon. Although it is covered by a fur pelt, it is still clearly a Reptile Digimon. Due to its extremely timid and shy 
    personality, it always gathers up the data which Garurumon leaves behind, and shapes it into a fur pelt to wear.`
  },
  {
    name: 'Gallantmon',
    description: ` an Exalted Knight Digimon. One of the "Royal Knights", it is a being containing contradictions, as it is 
    called a guardian deity of the Net despite being a Virus attribute, and if by any chance its balance is lost, it is 
    possible for it to become a dangerous being.`
  },
  {
    name: 'Garurumon',
    description: `an Animal Digimon. It is covered in blue, white, and silver-colored fur as hard as "Mithril", which is 
    called a legendary rare metal, and since the blades growing from the tips of its shoulders have sharp edges, anything that 
    touches them is cut to pieces. As it possesses a furious combat instinct and sinews honed in freezing lands, as well as 
    carnivore-like agility and the accuracy to reliably bring down its targets.`
  },
  {
    name: 'Gomamon',
    description: `a Sea Animal Digimon. It has become able to move on land, and is covered in temperature-maintaining fur. 
    The short, white fur that covers its body gets longer as it grows, and furthermore, it's said that it turns brown when 
    it grows up. Its personality is a naughty-boy type that fiddles with everything it sees.`
  },
  {
    name: 'GrapLeomon',
    description: `a Beast Man Digimon. It is a Grappling-species Digimon that took in the data of various fighting games, 
    using their original secrets to crush the opponent. Although it rotates the turbines on both of its arms and feet to 
    unleash ever-changing techniques, the turbines rotate by being blown into all at once by the fighting spirit emitted by 
    its DigiCore.`
  },
  {
    name: 'Greymon',
    description: `a Dinosaur Digimon. Greymon's cranial skin has hardened so that it is covered in a rhinoceros beetle-like shell. 
    It is an extremely aggressive Digimon, with a body like a lethal weapon covered in sharp claws and gigantic horns. However, 
    it is highly intelligent, and if you're able to tame it then there probably isn't any monster as strong.`
  },
  {
    name: 'Growlmon',
    description: `a Dark Dragon Digimon. It is called the "Deep-crimson Demon Dragon". The childishness it had when it was 
    Guilmon has vanished, and it digivolved into a wilder, more brutal Digimon. Also, although it is a Virus Digimon, it may 
    even battle for justice depending on how it was raised by its Tamer, because it will be faithfully obedient.`
  },
  {
    name: 'Guilmon',
    description: `a Reptile Digimon. It has an appearance like a dinosaur that still retains its youth. 
    Although it is still a Rookie, its potential as a "Combat Species", something which all Digimon naturally possess, 
    is very high, and it hides the ferocious personality of a carnivorous beast.`
  },
  {
    name: 'Hackmon',
    description: `a Mini Dragon Digimon. Its fur shines a cool white. Hackmon had encountered Gankoomon, who saw in it the 
    makings of the thirteenth Royal Knight, and decided to temper the Rookie Digimon with frequent, rigorous trials, 
    in order to pass on its own title as a Royal Knight to Hackmon.`
  },
  {
    name: 'Hawkmon',
    description: `a Bird Digimon. It is very polite, and is always calm, cool, and collected. Just like Veemon, it's a 
    descendant of a special species that flourished in ancient times, so it's able to borrow the power of the "Digi-Eggs"`
  },
  {
    name: 'HiAndromon',
    description: `an Android Digimon. The percentage of Chrome Digizoid parts which compose its body has increased, and it is 
    impossible to miss the extent of its gains in offensive and defensive power from this, compared to Andromon. 
    Additionally, as Andromon, it was incomplete, and by adding Chrome Digizoid parts to the Bio-Synapse circuits which govern 
    its thinking, it became self-aware, making it possible for it to execute its objectives.`
  },
  {
    name: 'HolyAngemon',
    description: `an Angel Digimon. It has eight shining, silver wings. MagnaAngemon's mission in the Digital World is as a 
    law enforcement officer, and it has the duty of supervising and surveying the many Angel Digimon. Furthermore, although 
    it is the speaker for the essence of "Light" trying to preserve the order of the Digital World`
  },
  {
    name: 'Ikkakumon',
    description: `a Sea Animal Digimon. It is a sea animal Digimon that was discovered in the computer of an Arctic 
    exploration base. Its thick fur and stout body are structured so that it can endure even freezing lands. Its sharp horn 
    is made of "Mithril", one of the rare metals, and the skin under its fur is just as hard.`
  },
  {
    name: 'Imperialdramon PM',
    description: `an Ancient Dragon Digimon. It is a form of Imperialdramon Fighter Mode that acquired the power of the holy 
    knight Omegamon, powering up and changing form into a legendary holy knight.`
  },
  {
    name: 'Jesmon',
    description: `a Holy Knight Digimon. It exceeded the perfection shining from the crystal in SaviorHuckmon's chest, 
    assumed its ultimate form, and acquired the title of a "Royal Knight", the highest rank of Network Security. 
    It is endowed with the ability to sense the unusual phenomena and signs of chaos that occur all over the Digital World, 
    and is the first of any of the Royal Knights to come running.`
  },
  {
    name: 'Leomon',
    description: `an Animal Digimon. It is called the "King of Beasts", as well as the "Noble Hero". While most Digimon 
    are ferocious, it possesses a strong will and a heart of justice, and has defeated a great number of fiendish Digimon.`
  },
  {
    name: 'MegaSeadramon',
    description: `a Sea Animal Digimon. It was a Seadramon-species that lived long in the harsh environment surrounding 
    Folder Continent, but digivolved in order to survive in the Digital World where the weak are food for the strong. 
    Its body became a size larger, the carapace covering its head got harder, and a lightning-shaped blade has grown 
    on its calvaria`
  },
  {
    name: 'MetalEtemon',
    description: `an Android Digimon. It calls itself the "King of Digimon", and was once called the strongest Digimon. 
    It went out to fight harsh battles in order to search out a mighty person, and though it was able to acquire valuable 
    combat data, it was also considerably injured due to the constant battles. It then studied its own weaknesses from the 
    data acquired through battling, and has now been perfectly reborn as an ultimate combat machine by full metallizing itself.`
  },
  {
    name: 'MetalGarurumon',
    description: `an Android Digimon. It is the final form of Garurumon and the ultimate form of Garurumon-species Digimon, and 
    powered itself up by metallizing almost its entire body. Not only has it retained its natural keenness when it underwent 
    metallization, but it can also pulverize the opponent with the countless weapons concealed throughout its body`
  },
  {
    name: 'MetalGreymon',
    description: `a Cyborg Digimon. It has mechanized more than half of its body, incorporating technology appropriated from 
    Andromon. The MetalGreymon of Folder Continent are Cyborg Digimon that succeed in perfectly digivolving from Greymon,`
  },
  {
    name: 'MetalSeadramon',
    description: `an Android Digimon. It is the final form of the Seadramon-species whose whole body is covered in the 
    strongest metal, Chrondigizoit alloy. Its Metal Body reflects every attack. Furthermore, it has the fastest speed of 
    movement among aquatic Digimon.`
  },
  {
    name: 'Mugendramon',
    description: `a Machine Digimon. With its whole body in 100% full metal, it is the Digital World's strongest Digimon. 
    It was built by synthesizing the parts of many Cyborg Digimon, and it is thought that all of the Cyborg Digimon produced 
    so far were merely prototypes for the completion of Mugendramon.`
  },
  {
    name: 'Omegamon',
    description: `a Warrior Digimon. One of the "Royal Knights", it was fused from the Virus Busters WarGreymon and 
    MetalGarurumon due to the powerful wills of everyone who wished for goodness. It is a Digimon who has combined the 
    special qualities of two bodies, so it is a multitype warrior which can fully demonstrate those abilities, for any 
    given situation.`
  },
  {
    name: 'Patamon',
    description: `a Mammal Digimon. It is characterized by its large ears, and is able to fly through the air by 
    using them as large wings, but because it only goes at a speed of 1 kph, it is said that it is definitely faster walking.`
  },
  {
    name: 'SaberLeomon',
    description: `an Ancient Animal Digimon. It is said to possess the ability for Mach speed. However, the details are 
    shrouded in mystery, though according to one theory, it is a Leomon who was changed into the shape of a beast.`
  },
  {
    name: 'SaviorHackmon',
    description: `a Dragon Man Digimon. It is a form of BaoHackmon which repeatedly met and parted with Digimon over 
    its long journey, lived through many scenes of carnage, and digivolved. It militarily intervenes in the strife that 
    occurs incessantly throughout the Digital World, seeking ceasefires, and has brought aid to the Digimon on-site who have 
    suffered harm.`
  },
  {
    name: 'Seadramon',
    description: `a Sea Animal Digimon. It has a long, serpentine body, which it uses to wreathe itself around enemies 
    that are coming to attack, and constrict until the enemy suffocates. Naturally, it doesn't have intelligence or speech, 
    and it swims around the Net Ocean leisurely according to its instincts.`
  },
  {
    name: 'Seraphimon',
    description: `an Angel Digimon. As one of the "Celestial Digimon", it is the executor of the enlightened God's laws. 
    It is dressed in holy armor that shines silver, and possesses ten golden wings. As the highest-ranked being among Angel 
    Digimon, it rules over them all.`
  },
  {
    name: 'Silphymon',
    description: `an Animal Digimon. It possesses tenacious leg strength, and its leaping power is said to reach great 
    heights. Also, it is able to fly about by spreading both of its arms and soaring like a glider after leaping high into 
    the sky.`
  },
  {
    name: 'Susanoomon',
    description: `a Wizard Digimon. Told of in Oriental legends, it is the strongest destructive god and the god which 
    governs over regeneration. It is told that when the Network System descends into chaos, it will erase the existing system, 
    and create a new one.`
  },
  {
    name: 'UlforceVeedramon',
    description: `a Warrior Digimon. It possesses the swiftest speed among the "Royal Knights", and there is no one that 
    can follow its movements. Also, its body is wrapped in holy armor made of the lightest-weight rare metal "Blue Digizoid", 
    which is rare even among Chrome Digizoid, so it can cleave the sky and split the earth.`
  },
  {
    name: 'Veedramon',
    description: `a Mythical Dragon Digimon. It is a mythical Digimon that, even with the vastness of the Digital World, 
    is said to only exist on the Folder Continent. Its existence is extremely precious, and even on the Folder Continent, 
    it is rarely encountered.`
  },
  {
    name: 'Veemon',
    description: `a Dragon Digimon. It is a new species of Digimon that was discovered recently. As a survivor of a 
    species that flourished in the Genesis of the Digital World, it is able to perform "Armor Digivolution", a 
    "pseudo-digivolution" using the Digi-Eggs.`
  },
  {
    name: 'Vikemon',
    description: `a Beast Man Digimon. It is a Mega Digimon which governs the freezing lands of the permafrost, 
    where nothing ever thaws. Its fur has become like ice crystals, and is said to be as hard as Chrome Digizoid. 
    With the morning star "Mjollnir" it carries on its back, it can annihilate a mountain in one swing, distorting space itself.`
  },
  {
    name: 'WarGreymon',
    description: `a Dragon Digimon. The strongest dragon warrior whose body is clad in armor of the super-metal 
    "Chrome Digizoid", it is the ultimate form of Greymon-species Digimon. Though it differs from the gigantic figure seen 
    in Greymon-species Digimon, and has the form of a Man-type, it has rapidly improved its speed and power, and it is likely 
    impossible to defeat it with the attacks of an Ultimate Digimon. `
  },
  {
    name: 'WarGrowlmon',
    description: `an Android Digimon. As its name suggests, its body has grown gigantic, and its upper body has been 
    metallized with "Chrome Digizoid". It is able to take flight with the two vernier attached to its shoulders, so it is 
    possible for it to perform both anti-air and anti-ground attacks.`
  },
  {
    name: 'WereGarurumon',
    description: `an Animal Digimon. It digivolved from Garurumon and became able to walk on two legs. It lost its 
    speed due to becoming bipedal, but became a Commando Type Digimon with stronger offensive and defensive power, 
    as well as developing a tactical nature.`
  },
  {
    name: 'Zudomon',
    description: `a Sea Animal Digimon. Ikkakumon digivolved further, and as a Power Digimon, it became able to walk on 
    two legs. It further guards its well-tempered muscles with protectors, which it made from the pelt and shell that it 
    stole from its opponents. The horn on its head has been replaced with one that became impossible to regrow, so it 
    voluntarily processed it into a saw shape.`
  }
];