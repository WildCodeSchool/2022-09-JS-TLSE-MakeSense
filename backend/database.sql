-- phpMyAdmin SQL Dump

-- version 5.3.0-dev

-- https://www.phpmyadmin.net/

--

-- Host: localhost

-- Generation Time: Jan 30, 2023 at 01:21 PM

-- Server version: 10.5.18-MariaDB-0+deb11u1

-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */

;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */

;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */

;

/*!40101 SET NAMES utf8mb4 */

;

--

-- Database: `makesense`

--

-- --------------------------------------------------------

--

-- Table structure for table `comments`

--

CREATE TABLE
    `comments` (
        `id` int(11) NOT NULL,
        `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
        `date_creation` datetime NOT NULL DEFAULT current_timestamp(),
        `id_user_writer` int(11) NOT NULL,
        `id_decision` int(11) NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--

-- Table structure for table `decisions`

--

CREATE TABLE
    `decisions` (
        `id` int(11) NOT NULL,
        `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`content`)),
        `status` int(11) NOT NULL DEFAULT 1 COMMENT '1: En attente d''avis\r\n2: En attente première décision\r\n3: En conflit\r\n4: Décision définitive prise\r\n5: Décision archivées(au bout de 3 mois)\r\n6: Décision non aboutie',
        `id_user_creator` int(11) DEFAULT NULL,
        `date_created` datetime NOT NULL DEFAULT current_timestamp(),
        `date_update` datetime NOT NULL DEFAULT current_timestamp(),
        `dates` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Prise de décision commencée : automatiquement incrémenté.\r\n- fin de la prise des avis\r\n- fin de la première décision\r\n- fin du conflit sur la première décision\r\n- décision définitive'
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--

-- Dumping data for table `decisions`

--

INSERT INTO
    `decisions` (
        `id`,
        `content`,
        `status`,
        `id_user_creator`,
        `date_created`,
        `date_update`,
        `dates`
    )
VALUES (
        119,
        '{\"title\":\"Trouver de nouveaux locaux\",\"description\":\"<p>Il faut trouver de nouveaux locaux car nous sommes trop à l\'étroit !</p>\",\"utility\":\"<p>Avoir plus de place.</p>\",\"context\":\"<p>Nous sommes actuellement dans des locaux trop petits.</p>\",\"pros\":\"<p>Avoir plus de place.</p>\",\"cons\":\"<ul><li>déménagement</li><li>ça va coûter cher</li></ul>\",\"firstDate\":\"2023-01-19T15:49:04.155Z\",\"dateOpinion\":\"2023-01-20T15:49:04.000Z\",\"dateFirstDecision\":\"2023-01-20T15:49:04.000Z\",\"dateEndConflict\":\"2023-01-21T15:49:04.000Z\",\"dateFinaleDecision\":\"2023-01-22T15:49:04.000Z\"}',
        3,
        7,
        '2023-01-19 16:55:53',
        '2023-01-19 16:55:53',
        NULL
    ), (
        121,
        '{\"title\":\"menu végétarien \",\"description\":\"<p>MENU VEGE</p>\",\"utility\":\"<p>Nous entrons dans une ère où il est important de mieux consommer ce que nous mangeons.</p>\",\"context\":\"<ul><li>Réduire la consommation de viande de chacun des salariés.</li><li>Faire des économies.</li><li>Consommer mieux.</li></ul>\",\"pros\":\"<ol><li>Santé des salariés</li><li>Economies</li><li>Variété de choix</li><li>Respect des croyances</li></ol>\",\"cons\":\"<ul><li>Acceptation par les employés.</li></ul>\",\"firstDate\":\"2023-01-24T08:45:08.478Z\",\"dateOpinion\":\"2023-02-03T08:45:08.000Z\",\"dateFirstDecision\":\"2023-02-04T08:45:08.000Z\",\"dateEndConflict\":\"2023-02-23T08:45:08.000Z\",\"dateFinaleDecision\":\"2023-03-31T07:45:08.000Z\"}',
        1,
        7,
        '2023-01-24 09:47:13',
        '2023-01-28 18:21:28',
        NULL
    ), (
        129,
        '{\"title\":\"La couleur des coussins du canapé\",\"description\":\"<p>J\'aimerais qu\'on change la couleur des coussins du canapé de la salle de pause</p>\",\"utility\":\"<p>Je trouve qu\'ils sont moches</p>\",\"context\":\"<p>Plus de gaieté</p>\",\"pros\":\"<p>Plus de style</p>\",\"cons\":\"<p>Cela coûte cher</p>\",\"firstDate\":\"2023-01-25T10:35:59.760Z\",\"dateOpinion\":\"2023-02-04T10:35:59.000Z\",\"dateFirstDecision\":\"2023-02-04T10:35:59.000Z\",\"dateEndConflict\":\"2023-02-11T10:35:59.000Z\",\"dateFinaleDecision\":\"2023-02-25T10:35:59.000Z\"}',
        4,
        40,
        '2023-01-25 11:38:37',
        '2023-01-30 14:13:37',
        NULL
    ), (
        161,
        '{\"title\":\"Café gratuit\",\"description\":\"<p>Nous voulons du café gratuit</p>\",\"utility\":\"<p>SVP</p>\",\"context\":\"<p>Petite pensée à Karine</p>\",\"pros\":\"<p>Pour les futurs Wilders</p>\",\"cons\":\"<p>Mais maintenant c\'est trop tard</p>\",\"firstDate\":\"2023-01-25T16:13:58.621Z\",\"dateOpinion\":\"2023-02-04T16:13:58.000Z\",\"dateFirstDecision\":\"2023-02-04T16:13:58.000Z\",\"dateEndConflict\":\"2023-02-11T16:13:58.000Z\",\"dateFinaleDecision\":\"2023-02-11T16:13:58.000Z\"}',
        5,
        40,
        '2023-01-25 17:15:18',
        '2023-01-30 14:11:40',
        NULL
    ), (
        175,
        '{\"title\":\"Changer un four à micro-ondes\",\"description\":\"<p>Le four à micro-ondes ne fonctionne plus depuis un certain temps il serait bien de le changer.</p>\",\"utility\":\"<p>Nous sommes 20 salariés à manger sur place et nous n\'avons plus de quoi réchauffer nos plats.</p>\",\"context\":\"<p>Pouvoir manger chaud.</p>\",\"pros\":\"<p>Meilleur environnement de travail pour les salariés.</p>\",\"cons\":\"<p>Coût financier.</p>\",\"firstDate\":\"2023-01-30T13:14:05.656Z\",\"dateOpinion\":\"2023-02-02T13:14:05.000Z\",\"dateFirstDecision\":\"2023-02-03T13:14:05.000Z\",\"dateEndConflict\":\"2023-02-04T13:14:05.000Z\",\"dateFinaleDecision\":\"2023-02-11T13:14:05.000Z\"}',
        1,
        40,
        '2023-01-30 14:16:16',
        '2023-01-30 14:18:23',
        NULL
    );

-- --------------------------------------------------------

--

-- Table structure for table `decisions_experts`

--

CREATE TABLE
    `decisions_experts` (
        `id_decisions` int(11) NOT NULL,
        `id_user_expert` int(11) NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------

--

-- Table structure for table `decisions_g_experts`

--

CREATE TABLE
    `decisions_g_experts` (
        `id_decisions` int(11) NOT NULL,
        `id_g_expert` int(11) NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--

-- Dumping data for table `decisions_g_experts`

--

INSERT INTO
    `decisions_g_experts` (`id_decisions`, `id_g_expert`)
VALUES (167, 56), (168, 56), (170, 59), (171, 59), (172, 62), (173, 56), (174, 59);

-- --------------------------------------------------------

--

-- Table structure for table `decisions_g_impacts`

--

CREATE TABLE
    `decisions_g_impacts` (
        `id_decisions` int(11) NOT NULL,
        `id_g_impact` int(11) NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--

-- Dumping data for table `decisions_g_impacts`

--

INSERT INTO
    `decisions_g_impacts` (`id_decisions`, `id_g_impact`)
VALUES (162, 7), (167, 59), (170, 58), (171, 59), (172, 62), (173, 59), (173, 58), (174, 58), (174, 56);

-- --------------------------------------------------------

--

-- Table structure for table `decisions_impacts`

--

CREATE TABLE
    `decisions_impacts` (
        `id_decisions` int(11) NOT NULL,
        `id_user_impact` int(11) NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------

--

-- Table structure for table `groups`

--

CREATE TABLE
    `groups` (
        `id` int(11) NOT NULL,
        `name` varchar(45) NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--

-- Dumping data for table `groups`

--

INSERT INTO `groups` (`id`, `name`) VALUES (58, 'CA');

-- --------------------------------------------------------

--

-- Table structure for table `group_user`

--

CREATE TABLE
    `group_user` (
        `id_groups` int(11) NOT NULL,
        `id_user` int(11) NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--

-- Dumping data for table `group_user`

--

INSERT INTO `group_user` (`id_groups`, `id_user`) VALUES (58, 44);

-- --------------------------------------------------------

--

-- Table structure for table `languages`

--

CREATE TABLE
    `languages` (
        `id` int(11) NOT NULL,
        `name` char(49) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
        `iso_639_1` char(2) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin;

--

-- Dumping data for table `languages`

--

INSERT INTO
    `languages` (`id`, `name`, `iso_639_1`)
VALUES (1, 'English', 'en'), (2, 'Afar', 'aa'), (3, 'Abkhazian', 'ab'), (4, 'Afrikaans', 'af'), (5, 'Amharic', 'am'), (6, 'Arabic', 'ar'), (7, 'Assamese', 'as'), (8, 'Aymara', 'ay'), (9, 'Azerbaijani', 'az'), (10, 'Bashkir', 'ba'), (11, 'Belarusian', 'be'), (12, 'Bulgarian', 'bg'), (13, 'Bihari', 'bh'), (14, 'Bislama', 'bi'), (15, 'Bengali/Bangla', 'bn'), (16, 'Tibetan', 'bo'), (17, 'Breton', 'br'), (18, 'Catalan', 'ca'), (19, 'Corsican', 'co'), (20, 'Czech', 'cs'), (21, 'Welsh', 'cy'), (22, 'Danish', 'da'), (23, 'German', 'de'), (24, 'Bhutani', 'dz'), (25, 'Greek', 'el'), (26, 'Esperanto', 'eo'), (27, 'Spanish', 'es'), (28, 'Estonian', 'et'), (29, 'Basque', 'eu'), (30, 'Persian', 'fa'), (31, 'Finnish', 'fi'), (32, 'Fiji', 'fj'), (33, 'Faeroese', 'fo'), (34, 'French', 'fr'), (35, 'Frisian', 'fy'), (36, 'Irish', 'ga'), (37, 'Scots/Gaelic', 'gd'), (38, 'Galician', 'gl'), (39, 'Guarani', 'gn'), (40, 'Gujarati', 'gu'), (41, 'Hausa', 'ha'), (42, 'Hindi', 'hi'), (43, 'Croatian', 'hr'), (44, 'Hungarian', 'hu'), (45, 'Armenian', 'hy'), (46, 'Interlingua', 'ia'), (47, 'Interlingue', 'ie'), (48, 'Inupiak', 'ik'), (49, 'Indonesian', 'in'), (50, 'Icelandic', 'is'), (51, 'Italian', 'it'), (52, 'Hebrew', 'iw'), (53, 'Japanese', 'ja'), (54, 'Yiddish', 'ji'), (55, 'Javanese', 'jw'), (56, 'Georgian', 'ka'), (57, 'Kazakh', 'kk'), (58, 'Greenlandic', 'kl'), (59, 'Cambodian', 'km'), (60, 'Kannada', 'kn'), (61, 'Korean', 'ko'), (62, 'Kashmiri', 'ks'), (63, 'Kurdish', 'ku'), (64, 'Kirghiz', 'ky'), (65, 'Latin', 'la'), (66, 'Lingala', 'ln'), (67, 'Laothian', 'lo'), (68, 'Lithuanian', 'lt'), (69, 'Latvian/Lettish', 'lv'), (70, 'Malagasy', 'mg'), (71, 'Maori', 'mi'), (72, 'Macedonian', 'mk'), (73, 'Malayalam', 'ml'), (74, 'Mongolian', 'mn'), (75, 'Moldavian', 'mo'), (76, 'Marathi', 'mr'), (77, 'Malay', 'ms'), (78, 'Maltese', 'mt'), (79, 'Burmese', 'my'), (80, 'Nauru', 'na'), (81, 'Nepali', 'ne'), (82, 'Dutch', 'nl'), (83, 'Norwegian', 'no'), (84, 'Occitan', 'oc'), (
        85,
        '(Afan)/Oromoor/Oriya',
        'om'
    ), (86, 'Punjabi', 'pa'), (87, 'Polish', 'pl'), (88, 'Pashto/Pushto', 'ps'), (89, 'Portuguese', 'pt'), (90, 'Quechua', 'qu'), (91, 'Rhaeto-Romance', 'rm'), (92, 'Kirundi', 'rn'), (93, 'Romanian', 'ro'), (94, 'Russian', 'ru'), (95, 'Kinyarwanda', 'rw'), (96, 'Sanskrit', 'sa'), (97, 'Sindhi', 'sd'), (98, 'Sangro', 'sg'), (99, 'Serbo-Croatian', 'sh'), (100, 'Singhalese', 'si'), (101, 'Slovak', 'sk'), (102, 'Slovenian', 'sl'), (103, 'Samoan', 'sm'), (104, 'Shona', 'sn'), (105, 'Somali', 'so'), (106, 'Albanian', 'sq'), (107, 'Serbian', 'sr'), (108, 'Siswati', 'ss'), (109, 'Sesotho', 'st'), (110, 'Sundanese', 'su'), (111, 'Swedish', 'sv'), (112, 'Swahili', 'sw'), (113, 'Tamil', 'ta'), (114, 'Telugu', 'te'), (115, 'Tajik', 'tg'), (116, 'Thai', 'th'), (117, 'Tigrinya', 'ti'), (118, 'Turkmen', 'tk'), (119, 'Tagalog', 'tl'), (120, 'Setswana', 'tn'), (121, 'Tonga', 'to'), (122, 'Turkish', 'tr'), (123, 'Tsonga', 'ts'), (124, 'Tatar', 'tt'), (125, 'Twi', 'tw'), (126, 'Ukrainian', 'uk'), (127, 'Urdu', 'ur'), (128, 'Uzbek', 'uz'), (129, 'Vietnamese', 'vi'), (130, 'Volapuk', 'vo'), (131, 'Wolof', 'wo'), (132, 'Xhosa', 'xh'), (133, 'Yoruba', 'yo'), (134, 'Chinese', 'zh'), (135, 'Zulu', 'zu');

-- --------------------------------------------------------

--

-- Table structure for table `lang_active`

--

CREATE TABLE
    `lang_active` (
        `id_language` int(11) NOT NULL,
        `json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`json`))
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--

-- Dumping data for table `lang_active`

--

INSERT INTO
    `lang_active` (`id_language`, `json`)
VALUES (
        1,
        '{\r\n  \"home\": \"Home\",\r\n  \"login\":\"Login\",\r\n\"errorconnection\" :\"Error connection\",\r\n  \"logout\": \"Logout\",\r\n  \"register\": \"Registrer\",\r\n  \"name\": \"Name\",\r\n  \"lastname\": \"Lastname\",\r\n  \"firstname\": \"firstname\",\r\n  \"email\":\"Email\",\"password\":\"password\",\"validatemypersonalinformation\":\"Validate my personal information\",\"mygroup\":\"My group\",\"delete\":\"delete\",\"wrongemail\":\"Wrong email\",\"minimum8charactersoneuppercaseonelowercase\":\"Minimum 8 characters one uppercase one lowercase\",\"Logintoyouraccount\":\"Login to your account\",\"langage\": \"Language\",\"notregistered?\":\"Not registered ?\",\"donthaveanaccountyet?signup\":\"Dont have an account yet?SignUp\",\r\n  \"list\":\"List\",\r\n  \"modify\":\"Modify\",\r\n  \"add\":\"Add\",\r\n  \"Selectlanguage\":\"Select language\",\r\n  \"waitopinion\":\"Awaiting review\",\r\n  \"mydecisions\":\"My decisions\",\r\n   \"theformhasbeensubmittedsuccessfully!\": \"The form has been submitted successfully !\",\r\n  \"backtodecisionss\": \"Back to decisions\",\r\n  \"description\": \"Description\",\r\n  \"describeherealltheinformationconcerningthedescription\": \"Describe here all the information concerning the description\",\r\n  \"title\": \"Title\",\r\n  \"Thisfieldisrequiredandmustcontainatleast5characters\": \"This field is required and must contain at least 5 characters.\",\r\n  \"usefulnessfortheorganization\": \"Usefulness for the organization\",\r\n  \"contextaroundthedecision\": \" Context around the decision\",\r\n  \"benefits\": \"Benefits\",\r\n  \"disadvantages\": \"Disadvantages\",\r\n  \"peopleconcerned\": \"People concerned\",\r\n  \"designatethepeopleconcerned\": \" Designate the people concerned\",\r\n  \"calendar\": \"Calendar\",\r\n  \"setdecision-makingtimeline\": \"Set decision timeline\",\r\n  \"dateoffilingofthedecision\": \"Date of filing of the decision\",\r\n  \"deadlinetogivefeedback\": \"Deadline to give feedback\",\r\n  \"deadlinetoenterdispute\": \"Deadline to enter dispute\",\r\n  \"thisdatemustbegreaterthanthedateoftoday\": \"This date must be greater than today\'s date.\",\r\n  \"dateofirstdecision\": \"Date of first decision\",\r\n  \"cancel\": \"Cancel\",\r\n  \"save\": \"Save\",\r\n  \"context\": \"Contexte\",\r\n  \"avantages\": \"Avantages\",\r\n  \"timeline\": \"Timeline\",\r\n  \"decisionmakingstarted\": \"Decision making started\",\r\n  \"deadline\": \"Deadline\",\r\n  \"firstdecision\": \"First decision\",\r\n  \"personconcerned\": \"Persons concerned\",\r\n  \"finaldecision\": \"Final decision\",\r\n  \"noonehasbeennamedasimpacted\": \"Nobody has been appointed as an impacted\",\r\n  \"noonehasbeenappointedasanexpert\": \"Nobody has been appointed as an expert\",\r\n  \"andothers\": \"and others...\",\r\n  \"thedecisionhasbeenremoved\": \"The decision has been removed\",\r\n  \"backtodecisionss\": \"Back to decisions\",\r\n  \"author\": \" Author\",\r\n  \"statut\": \"Statut\",\r\n  \"depositdate\": \" Deposit date\",\r\n  \"edit\": \"Edit\",\r\n  \"numberofpersons\": \"Number of persons\",\r\n  \"language\": \"langage\",\r\n  \"notice\": \"notice\",\r\n  \"alldecisions\": \"All decisions\",\r\n  \"awaitingfirstdecision\": \"Awaiting first decision\",\r\n  \"inconflict\": \"In conflict\",\r\n  \"archiveddecisions\": \"Archived decisions\",\r\n  \"unsuccessfuldecisions\": \"Unsuccessful decisions\",\r\n  \"fileadecision\": \"File a decision\",\r\n  \"describealltheelementsofhisdecision\": \"Describe all the elements of the decision\",\r\n  \"setschedule\": \"Set schedule\",\r\n  \"endoftakingopinions\": \"End of taking opinions\",\r\n  \"thisdatemustbegreaterthantodaysdate\": \" This date must be greater than today\'s date.\",\r\n  \"endofthefirstdecision\": \"End of the first decision\",\r\n  \"endoftheconflictonthefirstdecision\": \"ENd of the conflict on the first decision\",\r\n  \"postmydecision\": \"Post my decision\",\r\n  \"through\": \"By\",\r\n  \"therewasanerrorloadingthecomponent!\": \"There was an error loading the component !\",\r\n  \"madebymakesense\": \"Made by makesens\",\r\n  \"groupsconcerned\": \"Groups concerned\",\r\n  \"userimpacted\": \"Impacted users\", \r\n  \"userexpert\": \"Experts\",\r\n  \"groupsimpacted\": \"Impacted groups\",\r\n  \"groupsexperts\": \"Experts groups\",\r\n  \"returntomakesensewebsite\":\"Back to makesense website\",\r\n  \"thedatahasbeenchangedsuccessfully!\":\"Datas has been changed successfully !\",\r\n  \"backtoprofile\":\"Back to profile\",\r\n  \"validatemydecision\":\"Validate my decision\",\r\n  \"iamconcerned\": \"I am concerned\", \r\n  \"icommented\": \"I commented\", \r\n  \"postedthe\" : \"Posted the\"\r\n}'
    ), (
        34,
        '{\n  \"home\": \"Accueil\",\n  \"login\": \"Connexion\",\n\"errorconnection\" : \"Erreur Lors de la connexion\",\n  \"logout\": \"Deconnexion\",\n  \"register\": \"S\'enregistrer\",\n  \"name\": \"Nom\",\n  \"lastname\": \"Nom de Famille\",\n  \"firstname\": \"Prénom\",\n  \"email\": \"E-mail\", \"password\":\"Mot de Passe\",\"validatemypersonalinformation\":\"Valider mes informations personnelles\", \"mygroup\":\"Mes groupes\",\"delete\":\"Supprimer\",\"wrongemail\":\"email erroné\",\"minimum8charactersoneuppercaseonelowercase\":\"Minimum 8 caracteres une majuscule une minuscule un chiffre un caractère spécial\",\"logintoyouraccount\":\"Connectez-vous à votre compte\",\"language\": \"Language\",\"notregistered?\":\"Non enregistré ?\",\"Donthaveanaccountyet?SignUp\":\"Vous n\'avez pas encore de compte S\'inscrire\",\n  \"list\": \"Liste\",\n  \"modify\": \"Modifier\",\n  \"add\": \"Ajouter\",\n  \"selectlanguage\": \"Sélectionner un langage\",\n  \"waitopinion\": \"En attente d\'avis\",\n  \"mydecisions\": \"Mes décisions\",\n  \"theformhasbeensubmittedsuccessfully!\": \"Le formulaire a été soumis avec succès !\",\n  \"backtodecisionss\": \"Revenir aux décisions\",\n  \"description\": \"Description\",\n  \"describeherealltheinformationconcerningthedescription\": \"Décrire ici toutes les informations concernant la description\",\n  \"title\": \"Titre\",\n  \"Thisfieldisrequiredandmustcontainatleast5characters\": \"Ce champs est requis et doit contenir au moins 5 caractères\",\n  \"usefulnessfortheorganization\": \"Utilité pour l\'organisation\",\n  \"contextaroundthedecision\": \" Contexte autour de la décision\",\n  \"benefits\": \"Bénéfices\",\n  \"disadvantages\": \"Inconvénients\",\n  \"peopleconcerned\": \"Personnes concernées\",\n  \"designatethepeopleconcerned\": \" Désigner les personnes concernées (impactées ou expertes) par la décision\",\n  \"calendar\": \"Calendrier\",\n  \"setdecision-makingtimeline\": \"Définir le calendrier de la prise de décision\",\n  \"dateoffilingofthedecision\": \"Date de dépôt de la décision\",\n  \"deadlinetogivefeedback\": \"Deadline pour donner son avis\",\n  \"deadlinetoenterdispute\": \"Deadline pour entrer en conflit\",\n  \"thisdatemustbegreaterthanthedateoftoday\": \" Cette date doit être supérieure à la date d\'aujourd\'hui\",\n  \"dateofirstdecision\": \"Date de prise de la première décision\",\n  \"cancel\": \"Annuler\",\n  \"save\": \"Sauvegarder\",\n  \"context\": \"Contexte\",\n  \"avantages\": \"Avantages\",\n  \"timeline\": \"Chronologie\",\n  \"decisionmakingstarted\": \"Prise de décision commencée\",\n  \"deadline\": \"Deadline pour donner son avis\",\n  \"firstdecision\": \"Première Décision\",\n  \"\": \"Les personnes concernées\",\n  \"finaldecision\": \"Décision final\",\n  \"noonehasbeennamedasimpacted\": \"Personne n\'a été désigné comme étant impacté\",\n  \"noonehasbeenappointedasanexpert\": \"Personne n\'a été désigné expert\",\n  \"andothers\": \"et autres...\",\n  \"thedecisionhasbeenremoved\": \"La décision a bien été supprimée\",\n  \"backtodecisionss\": \"Revenir aux décisions\",\n  \"author\": \" Auteur\",\n  \"statut\": \"Statut\",\n  \"depositdate\": \" Date de dépôt\",\n  \"edit\": \"Editer\",\n  \"numberofpersons\": \"Nombre de personnes\",\n  \"language\": \"langage\",\n  \"notice\": \"avis\",\n  \"alldecisions\": \"Toutes les décisions\",\n  \"awaitingfirstdecision\": \"En attente première décision\",\n  \"inconflict\": \"En conflit\",\n  \"archiveddecisions\": \"Décisions archivées\",\n  \"unsuccessfuldecisions\": \"Décisions non abouties\",\n  \"fileadecision\": \"Déposer une décision\",\n  \"describealltheelementsofhisdecision\": \"Décrire tous les éléments de sa décision\",\n  \"setschedule\": \"Définir le calendrier\",\n  \"endoftakingopinions\": \"Fin de la prise des avis\",\n  \"thisdatemustbegreaterthantodaysdate\": \" Cette date doit être supérieure à la date d\'aujourd\'hui.\",\n  \"endofthefirstdecision\": \"Fin de la première décision\",\n  \"endoftheconflictonthefirstdecision\": \"Fin du conflit sur la première décision\",\n  \"postmydecision\": \"Poster ma décision\",\n  \"through\": \"Par\",\n  \"therewasanerrorloadingthecomponent!\": \"Il y a eu une erreur lors du chargement du composant !\",\n  \"madebymakesense\": \"Réalisé par makesens\",\n  \"groupsconcerned\": \"Groupes concernés\",\n  \"userimpacted\": \"Personnes impactées\", \n  \"userexpert\": \"Experts\",\n  \"groupsimpacted\": \"Groupes impactés\",\n  \"groupsexperts\": \"Groupes experts\",\n  \"returntomakesensewebsite\":\"Retour au site de makesense\",\n  \"thedatahasbeenchangedsuccessfully!\":\"Les données ont été modifiées avec succès !\",\n  \"backtoprofile\":\"Revenir au profil\",\n  \"validatemydecision\":\"Valider ma décision\",\n  \"iamconcerned\": \"Je suis concerné\", \n  \"icommented\": \"J\'ai commenté\", \n  \"postedthe\" : \"Posté le\"\n}'
    );

-- --------------------------------------------------------

--

-- Table structure for table `services`

--

CREATE TABLE
    `services` (
        `id` int(11) NOT NULL,
        `name` varchar(45) NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------

--

-- Table structure for table `users`

--

CREATE TABLE
    `users` (
        `id` int(11) NOT NULL,
        `lastname` varchar(45) NOT NULL,
        `firstname` varchar(45) NOT NULL,
        `email` varchar(254) NOT NULL,
        `password` varchar(255) NOT NULL,
        `serviceId` int(11) DEFAULT NULL,
        `admin` tinyint(1) DEFAULT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci COMMENT = 'Table utilisateurs';

--

-- Dumping data for table `users`

--

INSERT INTO
    `users` (
        `id`,
        `lastname`,
        `firstname`,
        `email`,
        `password`,
        `serviceId`,
        `admin`
    )
VALUES (
        7,
        'Boudjelal',
        'Yannick',
        'ndjbouman@gmail.com',
        '$argon2id$v=19$m=65536,t=3,p=4$EzOn31da2aJmu5M4dabpZQ$Q9azHhIvDyh9qFwDDGdiVzNc6ax+AxS+Oqv1UAWxu8I',
        NULL,
        1
    ), (
        10,
        'Kebdani',
        'Najim',
        'najimkeb31@gmail.com',
        '$argon2id$v=19$m=65536,t=3,p=4$Pkxev+bq4/CjXUxugQkpwA$OdAyVQSD2IhOzx467nDJoAl5YnupmxCHSBRY3HY/zKA',
        NULL,
        1
    ), (
        40,
        'MALBERT',
        'Stéphanie',
        'stephanie.malbert@live.fr',
        '$argon2id$v=19$m=65536,t=3,p=4$jUlOZNV/X8oGyfl+1wtHPg$39SrsiBykuKTWXHmK3mu29u6h0J9ESA3x+eYaNq5tag',
        NULL,
        1
    ), (
        44,
        'Schneider',
        'Marie-Hermine',
        'test@mail.fr',
        '$argon2id$v=19$m=65536,t=3,p=4$AUF1VA7tYv2jqUcS+zO3mw$E2HA7TXI3oWPdWf4nKmFBQe/qZ6oySjNtDSaG3iOvPk',
        NULL,
        1
    );

--

-- Indexes for dumped tables

--

--

-- Indexes for table `comments`

--

ALTER TABLE `comments`
ADD PRIMARY KEY (`id`),
ADD
    KEY `fk_comment_user_writer` (`id_user_writer`),
ADD
    KEY `fk_comment_decision` (`id_decision`);

--

-- Indexes for table `decisions`

--

ALTER TABLE `decisions`
ADD PRIMARY KEY (`id`),
ADD
    KEY `fk_decision_user_creator` (`id_user_creator`);

--

-- Indexes for table `decisions_experts`

--

ALTER TABLE
    `decisions_experts`
ADD
    KEY `fk_decisions_experts_decision` (`id_decisions`),
ADD
    KEY `fk_decisions_experts_user` (`id_user_expert`);

--

-- Indexes for table `decisions_impacts`

--

ALTER TABLE
    `decisions_impacts`
ADD
    KEY `fk_decisions_impacts_decisions` (`id_decisions`),
ADD
    KEY `fk_decisions_impacts_users` (`id_user_impact`);

--

-- Indexes for table `groups`

--

ALTER TABLE `groups`
ADD PRIMARY KEY (`id`),
ADD
    UNIQUE KEY `name_UNIQUE` (`name`);

--

-- Indexes for table `group_user`

--

ALTER TABLE `group_user`
ADD KEY `id_user` (`id_user`),
ADD
    KEY `id_group` (`id_groups`);

--

-- Indexes for table `languages`

--

ALTER TABLE `languages` ADD PRIMARY KEY (`id`);

--

-- Indexes for table `lang_active`

--

ALTER TABLE `lang_active`
ADD
    UNIQUE KEY `fk_lang_active` (`id_language`) USING BTREE;

--

-- Indexes for table `services`

--

ALTER TABLE `services`
ADD PRIMARY KEY (`id`),
ADD
    UNIQUE KEY `name_UNIQUE` (`name`);

--

-- Indexes for table `users`

--

ALTER TABLE `users`
ADD PRIMARY KEY (`id`),
ADD
    UNIQUE KEY `email_UNIQUE` (`email`),
ADD
    KEY `service_id` (`serviceId`);

--

-- AUTO_INCREMENT for dumped tables

--

--

-- AUTO_INCREMENT for table `comments`

--

ALTER TABLE
    `comments` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 44;

--

-- AUTO_INCREMENT for table `decisions`

--

ALTER TABLE
    `decisions` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 176;

--

-- AUTO_INCREMENT for table `groups`

--

ALTER TABLE
    `groups` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 68;

--

-- AUTO_INCREMENT for table `languages`

--

ALTER TABLE
    `languages` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 136;

--

-- AUTO_INCREMENT for table `services`

--

ALTER TABLE `services` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--

-- AUTO_INCREMENT for table `users`

--

ALTER TABLE
    `users` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 45;

--

-- Constraints for dumped tables

--

--

-- Constraints for table `comments`

--

ALTER TABLE `comments`
ADD
    CONSTRAINT `fk_comment_decision` FOREIGN KEY (`id_decision`) REFERENCES `decisions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
    CONSTRAINT `fk_comment_user_writer` FOREIGN KEY (`id_user_writer`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--

-- Constraints for table `decisions`

--

ALTER TABLE `decisions`
ADD
    CONSTRAINT `fk_decision_user_creator` FOREIGN KEY (`id_user_creator`) REFERENCES `users` (`id`) ON DELETE
SET NULL ON UPDATE CASCADE;

--

-- Constraints for table `decisions_experts`

--

ALTER TABLE
    `decisions_experts`
ADD
    CONSTRAINT `fk_decisions_experts_decision` FOREIGN KEY (`id_decisions`) REFERENCES `decisions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
    CONSTRAINT `fk_decisions_experts_user` FOREIGN KEY (`id_user_expert`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--

-- Constraints for table `decisions_impacts`

--

ALTER TABLE
    `decisions_impacts`
ADD
    CONSTRAINT `fk_decisions_impacts_decisions` FOREIGN KEY (`id_decisions`) REFERENCES `decisions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
    CONSTRAINT `fk_decisions_impacts_users` FOREIGN KEY (`id_user_impact`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--

-- Constraints for table `group_user`

--

ALTER TABLE `group_user`
ADD
    CONSTRAINT `fk_group_user` FOREIGN KEY (`id_groups`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
ADD
    CONSTRAINT `fk_user_group` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--

-- Constraints for table `lang_active`

--

ALTER TABLE `lang_active`
ADD
    CONSTRAINT `fk_lang_active` FOREIGN KEY (`id_language`) REFERENCES `languages` (`id`) ON UPDATE CASCADE;

--

-- Constraints for table `users`

--

ALTER TABLE `users`
ADD
    CONSTRAINT `fk_services_user` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE
SET NULL ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */

;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */

;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */

;