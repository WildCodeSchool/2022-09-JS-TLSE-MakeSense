-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 20 déc. 2022 à 11:33
-- Version du serveur : 8.0.31
-- Version de PHP : 8.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de données : `makesense`
--

-- --------------------------------------------------------

--
-- Structure de la table `decisions`
--

CREATE TABLE `decisions` (
  `id` int NOT NULL,
  `title` json NOT NULL,
  `content` json NOT NULL,
  `status` int NOT NULL DEFAULT '1' COMMENT '1: prise de décision commencée\r\n2: première décision prise (avant période de conflit)\r\n3: conflit sur la décision\r\n4: décision définitive\r\n5: décision non aboutie\r\n6: décision terminée (trois mois après définitive)',
  `id_user_creator` int DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_end` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `decisions_experts`
--

CREATE TABLE `decisions_experts` (
  `id_decision` int NOT NULL,
  `id_user_expert` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `decisions_impacts`
--

CREATE TABLE `decisions_impacts` (
  `id_decision` int NOT NULL,
  `id_user_impact` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `group`
--

CREATE TABLE `group` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `group_user`
--

CREATE TABLE `group_user` (
  `id_user` int NOT NULL,
  `id_group` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `languages`
--

CREATE TABLE `languages` (
  `id` int NOT NULL,
  `name` char(49) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `iso_639_1` char(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Déchargement des données de la table `languages`
--

INSERT INTO `languages` (`id`, `name`, `iso_639_1`) VALUES
(1, 'English', 'en'),
(2, 'Afar', 'aa'),
(3, 'Abkhazian', 'ab'),
(4, 'Afrikaans', 'af'),
(5, 'Amharic', 'am'),
(6, 'Arabic', 'ar'),
(7, 'Assamese', 'as'),
(8, 'Aymara', 'ay'),
(9, 'Azerbaijani', 'az'),
(10, 'Bashkir', 'ba'),
(11, 'Belarusian', 'be'),
(12, 'Bulgarian', 'bg'),
(13, 'Bihari', 'bh'),
(14, 'Bislama', 'bi'),
(15, 'Bengali/Bangla', 'bn'),
(16, 'Tibetan', 'bo'),
(17, 'Breton', 'br'),
(18, 'Catalan', 'ca'),
(19, 'Corsican', 'co'),
(20, 'Czech', 'cs'),
(21, 'Welsh', 'cy'),
(22, 'Danish', 'da'),
(23, 'German', 'de'),
(24, 'Bhutani', 'dz'),
(25, 'Greek', 'el'),
(26, 'Esperanto', 'eo'),
(27, 'Spanish', 'es'),
(28, 'Estonian', 'et'),
(29, 'Basque', 'eu'),
(30, 'Persian', 'fa'),
(31, 'Finnish', 'fi'),
(32, 'Fiji', 'fj'),
(33, 'Faeroese', 'fo'),
(34, 'French', 'fr'),
(35, 'Frisian', 'fy'),
(36, 'Irish', 'ga'),
(37, 'Scots/Gaelic', 'gd'),
(38, 'Galician', 'gl'),
(39, 'Guarani', 'gn'),
(40, 'Gujarati', 'gu'),
(41, 'Hausa', 'ha'),
(42, 'Hindi', 'hi'),
(43, 'Croatian', 'hr'),
(44, 'Hungarian', 'hu'),
(45, 'Armenian', 'hy'),
(46, 'Interlingua', 'ia'),
(47, 'Interlingue', 'ie'),
(48, 'Inupiak', 'ik'),
(49, 'Indonesian', 'in'),
(50, 'Icelandic', 'is'),
(51, 'Italian', 'it'),
(52, 'Hebrew', 'iw'),
(53, 'Japanese', 'ja'),
(54, 'Yiddish', 'ji'),
(55, 'Javanese', 'jw'),
(56, 'Georgian', 'ka'),
(57, 'Kazakh', 'kk'),
(58, 'Greenlandic', 'kl'),
(59, 'Cambodian', 'km'),
(60, 'Kannada', 'kn'),
(61, 'Korean', 'ko'),
(62, 'Kashmiri', 'ks'),
(63, 'Kurdish', 'ku'),
(64, 'Kirghiz', 'ky'),
(65, 'Latin', 'la'),
(66, 'Lingala', 'ln'),
(67, 'Laothian', 'lo'),
(68, 'Lithuanian', 'lt'),
(69, 'Latvian/Lettish', 'lv'),
(70, 'Malagasy', 'mg'),
(71, 'Maori', 'mi'),
(72, 'Macedonian', 'mk'),
(73, 'Malayalam', 'ml'),
(74, 'Mongolian', 'mn'),
(75, 'Moldavian', 'mo'),
(76, 'Marathi', 'mr'),
(77, 'Malay', 'ms'),
(78, 'Maltese', 'mt'),
(79, 'Burmese', 'my'),
(80, 'Nauru', 'na'),
(81, 'Nepali', 'ne'),
(82, 'Dutch', 'nl'),
(83, 'Norwegian', 'no'),
(84, 'Occitan', 'oc'),
(85, '(Afan)/Oromoor/Oriya', 'om'),
(86, 'Punjabi', 'pa'),
(87, 'Polish', 'pl'),
(88, 'Pashto/Pushto', 'ps'),
(89, 'Portuguese', 'pt'),
(90, 'Quechua', 'qu'),
(91, 'Rhaeto-Romance', 'rm'),
(92, 'Kirundi', 'rn'),
(93, 'Romanian', 'ro'),
(94, 'Russian', 'ru'),
(95, 'Kinyarwanda', 'rw'),
(96, 'Sanskrit', 'sa'),
(97, 'Sindhi', 'sd'),
(98, 'Sangro', 'sg'),
(99, 'Serbo-Croatian', 'sh'),
(100, 'Singhalese', 'si'),
(101, 'Slovak', 'sk'),
(102, 'Slovenian', 'sl'),
(103, 'Samoan', 'sm'),
(104, 'Shona', 'sn'),
(105, 'Somali', 'so'),
(106, 'Albanian', 'sq'),
(107, 'Serbian', 'sr'),
(108, 'Siswati', 'ss'),
(109, 'Sesotho', 'st'),
(110, 'Sundanese', 'su'),
(111, 'Swedish', 'sv'),
(112, 'Swahili', 'sw'),
(113, 'Tamil', 'ta'),
(114, 'Telugu', 'te'),
(115, 'Tajik', 'tg'),
(116, 'Thai', 'th'),
(117, 'Tigrinya', 'ti'),
(118, 'Turkmen', 'tk'),
(119, 'Tagalog', 'tl'),
(120, 'Setswana', 'tn'),
(121, 'Tonga', 'to'),
(122, 'Turkish', 'tr'),
(123, 'Tsonga', 'ts'),
(124, 'Tatar', 'tt'),
(125, 'Twi', 'tw'),
(126, 'Ukrainian', 'uk'),
(127, 'Urdu', 'ur'),
(128, 'Uzbek', 'uz'),
(129, 'Vietnamese', 'vi'),
(130, 'Volapuk', 'vo'),
(131, 'Wolof', 'wo'),
(132, 'Xhosa', 'xh'),
(133, 'Yoruba', 'yo'),
(134, 'Chinese', 'zh'),
(135, 'Zulu', 'zu');

-- --------------------------------------------------------

--
-- Structure de la table `lang_active`
--

CREATE TABLE `lang_active` (
  `id_language` int NOT NULL,
  `json` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `lang_active`
--

INSERT INTO `lang_active` (`id_language`, `json`) VALUES
(1, '{\"home\": \"Home\", \"login\": \"Login\", \"logout\": \"Logout\", \"register\": \"Register\", \"register2\": \"Register2\"}'),
(23, '{\"home\": \"Willkommen\", \"login\": \"Anmeldung\", \"logout\": \"Ausloggen\", \"register\": \"Registrieren\"}'),
(34, '{\"home\": \"Accueil\", \"login\": \"Connexion2\", \"logout\": \"Deconnexion\", \"register\": \"S\'enregistrer\"}');

-- --------------------------------------------------------

--
-- Structure de la table `services`
--

CREATE TABLE `services` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `lastname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `firstname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) NOT NULL,
  `service_id` int DEFAULT NULL,
  `admin` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table utilisateurs';

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `decisions`
--
ALTER TABLE `decisions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_decision_user_creator` (`id_user_creator`);

--
-- Index pour la table `decisions_experts`
--
ALTER TABLE `decisions_experts`
  ADD KEY `fk_decisions_experts_decision` (`id_decision`),
  ADD KEY `fk_decisions_experts_user` (`id_user_expert`);

--
-- Index pour la table `decisions_impacts`
--
ALTER TABLE `decisions_impacts`
  ADD KEY `fk_decisions_impacts_decisions` (`id_decision`),
  ADD KEY `fk_decisions_impacts_users` (`id_user_impact`);

--
-- Index pour la table `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Index pour la table `group_user`
--
ALTER TABLE `group_user`
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_group` (`id_group`);

--
-- Index pour la table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `lang_active`
--
ALTER TABLE `lang_active`
  ADD UNIQUE KEY `fk_lang_active` (`id_language`) USING BTREE;

--
-- Index pour la table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD KEY `service_id` (`service_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `decisions`
--
ALTER TABLE `decisions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `group`
--
ALTER TABLE `group`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT pour la table `services`
--
ALTER TABLE `services`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `decisions`
--
ALTER TABLE `decisions`
  ADD CONSTRAINT `fk_decision_user_creator` FOREIGN KEY (`id_user_creator`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `decisions_experts`
--
ALTER TABLE `decisions_experts`
  ADD CONSTRAINT `fk_decisions_experts_decision` FOREIGN KEY (`id_decision`) REFERENCES `decisions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_decisions_experts_user` FOREIGN KEY (`id_user_expert`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `decisions_impacts`
--
ALTER TABLE `decisions_impacts`
  ADD CONSTRAINT `fk_decisions_impacts_decisions` FOREIGN KEY (`id_decision`) REFERENCES `decisions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_decisions_impacts_users` FOREIGN KEY (`id_user_impact`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `group_user`
--
ALTER TABLE `group_user`
  ADD CONSTRAINT `fk_group_user` FOREIGN KEY (`id_group`) REFERENCES `group` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_user_group` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Contraintes pour la table `lang_active`
--
ALTER TABLE `lang_active`
  ADD CONSTRAINT `fk_lang_active` FOREIGN KEY (`id_language`) REFERENCES `languages` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_services_user` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;
