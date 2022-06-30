<template>
    <div class="md:grid grid-cols-2" @keydown="detect($event)" v-if="!showCards">
        <div class="px-10">
            Submit your flashcards
            <input type="text" class="border border-gray block my-5 px-2 py-1" v-model="splitToken">
            <textarea name="" id="" cols="90" rows="10" v-model="inputItems"
                class="border border-gray block"></textarea>
            <div class="flex gap-10 mt-4">
                <button class="bg-slate-100 rounded-md py-2 px-3 hover:bg-slate-50" @click="createCards()"> create cards</button>
                <button class="bg-slate-100 rounded-md py-2 px-3 hover:bg-slate-50" @click="shuffleCards()"> shuffle cards</button>
                <button class="bg-slate-100 rounded-md py-2 px-3 hover:bg-slate-50" @click="toggleFlashCards()">Show Cards</button>
            </div>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Front</th>
                        <th>Back</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items">
                        <td>{{ item.front }}</td>
                        <td>{{ item.back }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="fixed flex inset-0 bg-black bg-opacity-30" v-if="showCards">
            <button class="px-3" @click="itemsController.prev()">&lt;</button>

        <div class="md:w-1/3 w-full h-44 m-auto rounded-md bg-slate-100 flex px-10 py-6 text-2xl text-center relative" @click="frontShow = !frontShow" >
            <span class="text-sm absolute top-2 left-2">
                {{flashcardPosition + 1}} / {{items.length + 1}}
            </span>
            <button class="absolute top-2 right-2 text-sm" @click="toggleFlashCards()">x</button>
            <div class="m-auto">
                <div v-if="frontShow">
                    {{items[flashcardPosition]?.front}}
                </div>
                <div v-if="!frontShow">
                    {{items[flashcardPosition]?.back}}
                </div>
            </div>
        </div>
            <button class="px-3" @click="itemsController.next()">&gt;</button>

    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const inputItems = ref(`80/20 rule;20% of consumers are responsible for 80% of revenue
Big Data;Extremely large datasets with detailed customer information
Consumer;Someone who buys stuff
Consumer behaviour;Study of processes involved when individuals or groups ‘act’ to satisfy needs & desires.
Consumer Culture theory;Research focused on consumption from a social and/or demographic standpoint rather than an economic
Consumer trends;Underlying values that drive consumer to a product
Consumption communities;People in a group that purchase the same stuff (apple lovers)
Database Marketing;Marketing based on actions of consumers
Demographics;Descriptive Characteristics of a group
Digital Native;Someone who grew up in the digital world
Exchange;A transaction
Heavy users;Most valuable consumers
Internet of Things;Network of interconnected devices
Interpretivism;Postmodernism (questions the digital world)
Lifelog;Vlog of our life
M2m (machine to machine communication);Machines communicate with each other
Machine learning;Machine adjusts itself based on values
Market segmentation strategies;Marketing based on characteristics of markets in question
Megacity;MET Area with more than 20 million people
Need ;A desire
Paradigm;A pattern
Pastiche;A work or style that imitates the original
Popular Culture;A culture based on celebrities or large communities
Positivism;Modernism
Relationship Marketing;Marketing focused on interacting with a person
Robot companions;Robots which are satisfying a need
Role theory;
Sexbots;Robot companions designed to satisfy the ‘sex’ need
Social Media;Facebook
User generated content;Content created
Want;A need
Web 2.0;
Adaptive Clothing;Clothing for disabled people
Anti-consumption;Deliberate deface or ruin goods or services
Bioterrorism;Terrorism based on biological substances e.g., Poisoning
Botnets;A network of computers designed to implement or execute a virus
Business ethics;Rules of conduct within a marketplace
Cause marketing;Type of Corporate Social responsibility. You buy a pair of shoes -> we donate a pair of shoes
Compulsive consumption;Consumptions based on states of mind such as boredom
Conscientious consumerism;Buy stuff you really thought about
Consumed consumers;Users who are exploited for commercial gain in the market
Consumer addiction;Addiction based on consumer goods such as food or drinks
Consumer space;Consumers choose how they will interact with companies
Corporate social responsibility;Companies should do good deeds for the society
Corrective advertising;A company should not mislead consumers with advertising.
Counterfeiting;Imitating goods or services
Culture jamming;Protest of anti-consumerism to undermine advertising
Cyberbullying;Bullying via social networks
Cyberterrorism;Terrorism with viruses designed to disable computer systems
Economics of information;How does information (systems) affect economic decisions
Food desert;People who do not live within reasonably distance of a supermarket
Functionally illiterate;Cannot read well enough for day-to-day business
Green marketing;Advertising of a company based on the environmentally friendly stuff
Greenwashing;When companies act greener than they really are. 
Identity theft ;Copying or imitating another person’s identity
Locational privacy;Individuals decide how their location is being used
LOHAS;Lifestyle of Health and Sustainability. Consumers connected to earth
Market access;Access to all certain types of markets or services
Marketplace sentiments;Shared emotional dispositions against a good/market/service
Media literacy;Ability to detect different types of Media
Phantom Vibration syndrome;Feeling the phone when it is not there
Phishing;Stealing by sending by impersonating a bank or institution
Real time bidding;Advertising bidding on the market
Red market;A market of violence and theft
Serial wardrobers;Individuals who are wearing clothing once and sending it back
Shrinkage;When employees and/or customers steal from a company
Slacktivism;Supporting a cause with as little effort as possible by means of social media or online petitions
Social Marketing;Marketing to improve welfare of individuals in the social and economic environment in which they live.
Social media addiction;Addiction to social media
 Superfoods;Foods such as Quinoa with ‘extraordinary’ abilities
Sustainability;Environmentally friendly 
Transformative consumer research;Research consumers and their behaviour to improve consumer well being
Triple bottom-line orientation;Companies should focus on Profit, People, and the Planet
Absolute threshold;Lowest level of stimulation an individual can detect
Adaption;Degree to which a consumer notices sensory input
Attention;The extent of how much energy is focused on a task
Audio watermark;A unique sound or song associated with the brand/product
Augmented reality;Fake reality within a computer
Cell phone zombie;Doing other stuff while on the phone
Closure principle;We are looking for a pattern within an image or something else
Colour forecasts;Trying to predict the colour consumers find hot and trendy in the future
Contrast;A noticeable difference in a message or else
Differential threshold;Detect changes between 2 stimuli
Embeds;Tiny pictures within pictures
Emojis;Emoticons
Endowment effect;The way attributes more value to a certain good the longer we hold
Exposure;When a stimulus occurs within someone’s sensory receptors
Eyeball economy;Economy which is measured of how much it is looked at/viewed
Figure-ground principle;One part of the figure will dominate while the other will recede to the background
Gastrophysics;Science of food
Gestalt;The whole is greater than its parts
Golden triangle;Top left of the internet page
Haptic;Touch
Hyperreality;Inability to define simulation of reality
Icon;Sign that resembles the product
Index;Sign that connects to a product because they share the same property
Interpretant;Meaning we derive from the sign
Interpretation;Meanings we assign to a sensory stimulation
Just noticeable difference;The minimal difference we can detect between two communications
Kansei engineering;Designing based on the way we feel
Media snacker;Individual who digests lots of different types of media
Mindfulness;Turn out distractions and slow down
Multitasking;Process information from more than 1 medium
Natural user interface;An interface which we do not have to learn to understand
Object ;The product is the focus of the message
Perception;Process of selecting, organize and interpret sensations
Perceptual defence;We see what we want to see
Perceptual selection;We pay attention to a small part of all communications
Perceptual vigilance;We are more likely to be aware of stimuli that relate to our current needs
Positioning strategy;Marketing mix in actions
Psychophysics;Science which studies the relations between physical stimuli and mental phenomena
Rich media;Animated communications such as GIF’s
Schema;
Semiotics;Meaning of symbols
Sensation;Stimuli to our perceptions
Sensory marketing;Marketing which appeals to our senses
Sensory overload;To much information what we can process
Sensory threshold;Maximum of information we can process
Sign;An image which represents the intended meanings of an object
Similarity principle;Grouping of similar looking objects
Sound symbolism;The way sound of brands influences us
Subliminal perception;Hidden message that we do not recognize consciously
Symbol;A message which relates to a product by associations
Trade dress ;Colour combinations which relate to a company
Weber’s law;Stronger the initial stimulus, the greater a change it must be to notice the difference
Activation models of memory;
Advertising wears out;
Associative network;
Behavioural learning theories;Learning takes place as result of responses to external events
Brand equity;
Chunking ;
Classical conditioning;Pavlov effect
Cognitive learning theory;
Conditioned response;Response that is generated by associating to an UR
Conditioned stimulus;Neutral stimulus that, after becoming associated with the unconditioned stimulus, eventually comes to trigger a conditioned response.
Consumer confusion;State of mind in which consumers makes imperfect purchasing decisions
Consumer socialization;How young people acquire skills, knowledge, and attitudes relevant to their functioning as consumers in the marketplace
Decay;Fading memory of an ad
Elaborative rehearsal;Repeating information to transfer into the long-term memory
Encoding stage;Initial learning of information
Endowed progress effect;With artificial advancement a person will be more motivated
Episodic memories;Memory of everyday events that can be explicitly stated.
Extinction;Process in which a learned response is forgotten
Family branding;Making multiple products under the same name
Fixed interval reinforcement;On time intervals a specific stimulus 
Fixed ratio reinforcement;With specific amounts a stimulus 
Follower brands;Brand that follows a successful brand in a market
Frequency marketing;Loyalty marketing
The google effect;Forgetting information which we can easily find on google
Gamification;Making incentives ‘winnable’
Halo effect;Create an impression based on 1 vale
Highlighting effect;
Hybrid ads;Advertising which uses traditional marketing (billboards) and digital marketing (online)
Incidental learning;Unplanned learning. 
Instrumental conditioning;A process in which behaviour is modified by the reinforcing of inhibiting effect of its consequence
Interference;With learning new information, we forget old information
Learning;Permanent change based on experience
Licensing;‘Loan’ a brand name to another type of product
Long-term memory;Memory which we tend to remember for a long term
Look-alike packaging;Packaging which copies to original ‘successful’ brand
Memory;Where we store information
Mixed Emotions;Positive and negative emotions mixed
Modelling;Imitating behaviour of others
Multiple intelligence theory;Influences multiple types of intelligence
Narrative;Description of a product written as a story
Negative reinforcement;Punish bad behaviour
Nostalgia;Reminds us of the ‘good old days’
Observational learning;Watch actions of others and see how they are rewarded
Pioneering brand;First brand entering a market
Positive reinforcement;Reward good behaviour
Product line extension;Create a different product under the same name
Punishment;Straf
Recall;Access our long-term memory
Recognition;If we can associate the product or brand with something in our long-term memory
Repetition;Repeated
Response bias;Respondents of form wants to answer ‘good’. They recall what they cannot recall
Retrieval stage;Stage in which we retrieve information from our long-term memory
Retro brand;Brand which we remember as kids and gets reintroduced
Salience;Property of being noticeable or important
Script ;A typing sequence of events
Sensory memory;Storing information of our senses
Service scripts;Scripts like customer service
Shaping ;Condition behaviour with incentives
Short term memory;Memory which stores information for a short period of time
Social default;Mimic behaviour of others
Spacing effect ;Recall communications when periodically repeated
spontaneous recovery;Nostalgia
spreading activation;Shifting back and forth between different types of meaning.
stage of cognitive development;Ability to comprehend different types of abstract concepts
state-dependent retrieval;We retrieve info better when in the same state
stimulus discrimination;When UCS does not follow a stimulus like CS
stimulus generalization;Tendency of stimuli like a CS
storage stage;We ‘store’ the information
unconditioned stimulus;
unipolar emotions;Wholly positive or negative emotions
variable interval reinforcement;
variable ratio reinforcement;
von restorff effect;Unusual packaging improves brand recall
Affect;Reactions based emotional responses
Alternate reality games;Roleplay games
Approach approach conflict;Choose between two desirable alternatives
Approach avoidance conflict;We desire it and want to avoid it at the same time
Accordance avoidance conflict;Two options we do not desire. One is worse than the other
Brand loyalty;When a consumer is highly involved in a product
Co creation;Companies works together with customer  
Cult products;Products such as Apple
DIY;IKEA effect
Drive;Reduce an urgency
Drive theory;Biological needs that produce unpleasant states of arousal.
Embarrassment;Emotion driven by what others think of us
Emotional oracle effect;Trust your feelings -> better decisions
Emotions;State of mind
Envy;Jealous
Evaluations;
Expectancy theory;Choose a product which has more positive effects
Goal ;Desired end state
Guilt;Unpleasant emotion based on an individual action
Happiness;Mental state of well being
Happiness economy;Economy based on mental well-being of individuals
Hedonic consumption;And unneeded desire
Hierarchy of needs;Maslow hierarchy of needs
Homeostasis;Balance an aroused state to the origin
IKEA Effect;If we build it ourselves, we associate more value with it
Incidental brand exposure;Cues in the environment can activate a goal when we do not know it
Inertia;Consumption at the low end of involvement -> lazy
Involvement;Person’s perceived relevance based on the characteristics of the product
Lovemark;Passionate commitment to 1 product
Mass customization;Customization at a mass production price
Material accumulation;We want to earn more than we can consume
Message involvement;
Mood congruency;Our judgments tend to be shaped by our moods
Moods;Different emotions for a long time
Motivation;Drive towards a goal
Narrative Transportation;People become involved in the storyline
Negative state relief;Manipulating a negative state into a positive state
Perceived risk;If this is high, then customer involvement is also high
Placebo effect;Duh
Product involvement;Consumers level of interest in a product
Retail Therapy;Act of shopping restores a sense of personal control
Sadvertising;Creating an ‘aww’ effect
Sentiment analysis;Connect words to a state of mind (excellent, good)
Situational Involvement;Describes engagement with a store website or location
Spectacles;Captivate customers with ludicrous actions
Subscription boxes;Subscriptions 
Theory of cognitive dissonance;A need for order and consistency in life
Variety seeking;Desire to choose new alternatives over familiar ones
Word phrase Dictionary;Connect data to other data -> library
Actual self;Realistic reflection of qualities we have and do not have
Agentic goals;Self-assertion and mastery
Androgyny;Possession of both masculine and feminine traits
Avoidance selves;Person which we do not want to be
Biohackers;IoT in our bodies
Body image;The way we look at ourselves
Body image distortions;The way we feel we do not meet up the general expectations
Bro culture;Worst type of stereotypical fraternity life into corporate world
Bromance;Affection between straight male friends
Chipped;Chip inside your body
Collective self;Derives the identity within a social group
Communal goals;Affiliation and building harmonies
CYMFA;
Cyborg;Half machine half human
Digital self;Your identity online
Dramaturgical perspective;Perspective in which people are actors who play different rolls
Embodied cognition;State of body modifies state of mind
Empty self;Declined shared points of reference
Enclothed cognition;Clothing changed how people behave
Extended self;Possessions are an extension of who we are
Fantasy;Self-induced shift in consciousness to an alternate reality
Fatshionistas;People who make clothing for plus-sized consumers
Fattism;We do not like fat people
Gender benders;People who bend traditional sex roles
Gender bending products;Products which bend traditional sex roles
Gender binarism;Classification of gender in two traits
Gender identity;Who you are as a gender
Gender socialization;Who you ‘need’ to be as a boy or a girl
Group dieting;Dieting with a certain same type of people
Ideal of beauty;How one should look according to standards
Ideal self;Conception of wanting to have certain qualities
Identity;Who you are as person
Imbibing idiot bias;Holding alcohol makes you look less intelligent
Impression management;We work hard to manage another person’s impression of us
Looking glass self;Taking role of the other
Masculinism;Manly traits 
Medical tourism;Tourism focused on plastic surgery
Morbid ink;Incorporate DNA into the ink so that you carry your loved one forever
Neuroendocrinological science;Focus on the potential role of hormonal influences on preferences for different kinds of products or people.
Power posing;Standing in a confident way -> more confident
Public self-consciousness;
Self-concept;Summarizes believes of a persons own attributes
Self esteem;Summarizes positivity of person’s self-concept
Self-fulfilling prophecy;If we think it is going to happen, it will happen
Self-monitors;Know how you come across in a social situation
Selfie;Picture of yourself
Self-image congruence models;We choose products who represents us who we are
Sex roles;What we should like based on our gender
Sexting;
Sex typed products;Products based on our gender
Sex typed traits;Traits based on our gender
Singularity movement;Human intelligence is merging with machine intelligence
Snackwave;Binging on unhealthy food as a ‘protest’
Social comparison;Compare us against an ad
Symbolic interactionism;Relationships with other people play a large part to form ourselves
Symbolic self-completion theory;
Thinspiration;Inspiration based on being thin
Third gender movement;Check different genders on institutions
Torn self;Struggle with retaining an authentic culture while enjoying western freedom
Vanity sizing;Smaller sizes while they are not smaller
Virtual makeover;Recreate us online
Wearable computing;Smartwatch
Acculturation;Understand culture of another culture than you own
AIOs;Activities, Interest, Opinions. Psychographic variables
Anthropomorphism;Attribute human characteristics to objects or animals
Archetypes;Universally recognized ideas and behaviour pattern
Belief system;Our reasoning why we want or do different things
Big five;Personality traits
Brand personality;Traits we attribute to a Brand
Brand resonance;
Brand storytelling;Communications as a story of the brand
Buyer personas;A profile of a customer
Co-branding strategies;When two companies team up to promote a product
Consumptions constellation;Define, communicate, and perform social roles based on products
Convention;A norm that regulates how we conduct our everyday lives
Core values;Unique values that describe a culture
Crescive norms;Subtle norms
Curation;Carefully consider how and which products needs to be displayed
Custom;Norm that controls basic behaviour.
Decluttering;Clean up
Doppelgänger brand image;An ironic brand image
Ego;The ‘self’
Enculturation;Learn about your own culture believes etc
E-sports;Electronic sports
Frugality;Think what you buy
ID;Immediate gratification of ‘needs’
Instrumental values;Actions we need to take to achieve terminal values
Japan-VALS;Segment the Japanese society into different segments based on primary motivation and attitudes about social change
Laddering;Technique to uncover customers associations between specific attributes
Lifestyle;Pattern of consumption
Lifestyle marketing perspective;People sort themselves into groups based on the things they like
Lifestyle segmentation typologies;
List of values scales;Defines 9 consumer segments based on values member adore
Living off the grid;Living without any contact to the digital world
Materialism;Way of life where consumers value themselves based on products they own
Means-end chain model;Linkage of specific product traits to terminal values
MMPI;Personalities stabilize when we reach 30
More;A custom with a strong moral overtone
Motivational Research;Research based on motivations
MBTY;Myer briggs
Personality;Persons unique psychological makeup
Personality traits;Identifiable characteristics that define a person
Pleasure principle;Our system that maximizes pleasure
Product complementarity;When symbolic meanings of different products align
Provenance;Shoppers are willing to pay more if they know where it comes from.
Psychographics;Use of psychological sociological and anthropological factors 
Reader-response theory;Relying on the reader how he/she will understand the story
Reality principle;The ego will ways to gratify the ID that the outside world finds acceptable
Superego;The persons conscience
Terminal values ;Desired end states
Tiny house movement;Living in small houses
Underdog brand biography;How a brand defies all odds
VALS;Categorises consumers in six core groups: tradition, achievement self-expression, resources, innovation
Value;A belief that some condition is preferable to its opposite
Value system;Ranking of individual values
`)

const splitToken = ref(';')

const items = ref([])

const frontShow = ref(true)

const flashcardPosition = ref(0)

const showCards = ref(false)

const createCards = _ => {
    flashcardPosition.value = 0
    items.value = []
    inputItems.value.split('\n').forEach(row => {
        const splitted = row.split(splitToken.value)
        items.value.push({
            front: splitted[0],
            back: splitted[1]
        })

    })
}

const shuffleCards = _ => {
    flashcardPosition.value = 0
    for (var i = items.value.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = items.value[i];
        items.value[i] = items.value[j];
        items.value[j] = temp;
    }
}

function preventZoom(e) {
  var t2 = e.timeStamp;
  var t1 = e.currentTarget.dataset.lastTouch || t2;
  var dt = t2 - t1;
  var fingers = e.touches.length;
  e.currentTarget.dataset.lastTouch = t2;

  if (!dt || dt > 500 || fingers > 1) return; // not double-tap

  e.preventDefault();
  e.target.click();
}

onMounted(() => {
    document.addEventListener('keydown', detect)
    document.addEventListener('touchstart', preventZoom)
    createCards()
})

onBeforeUnmount(() => { 
    document.removeEventListener('keydown', detect)
    document.addEventListener('touchstart', preventZoom)
    })
const toggleFlashCards = _ => showCards.value = !showCards.value

const itemsController = {
    next: _ => {
        frontShow.value = true
        flashcardPosition.value++
    },
    prev: _ => {
        frontShow.value = true
        flashcardPosition.value--
    },
    toggle: _ => {
        frontShow.value = !frontShow.value
    }
}


const detect = (event = KeyboardEvent) => {
    event.stopPropagation()
    if(event.code === 'Space' || event.code === 'ArrowDown' || event.code === 'ArrowUp') {
        itemsController.toggle()
    }
    
    if(event.code === 'ArrowRight' && flashcardPosition.value < items.value.length) {
        itemsController.next()
    }
    if(event.code === 'ArrowLeft' && flashcardPosition.value > 0) {
        itemsController.prev()
    }

    if(event.code === 'Escape' && showCards.value === true) {
        toggleFlashCards()
    } 
}


</script>