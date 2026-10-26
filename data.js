/* Données : exercices, séances, règles de sécurité.
   Angles en degrés (SVG) : 0 = droite, 90 = bas, -90 = haut, 180 = gauche.
   Pose : r = bassin [x,y], t = tronc, h = tête, a / a2 = bras proche / lointain [haut, avant-bras],
          l / l2 = jambe proche / lointaine [cuisse, tibia], c = courbure du dos, props = décor. */
window.DATA = {
  groups: ["Mobilité", "Bas du corps", "Dos & gainage", "Haut du corps", "Cardio doux"],

  exos: [
    {
      id: "catcamel", name: "Dos rond / dos creux (chat-vache)", group: "Mobilité", icon: "🐱",
      dose: { type: "reps", sets: 2, reps: 8 }, rest: 30,
      cap: ["Dos rond (expirez)", "Dos creux léger (inspirez)"],
      steps: [
        "À quatre pattes sur un tapis, mains sous les épaules, genoux sous les hanches. Glissez un coussin sous les genoux.",
        "En expirant, arrondissez doucement le dos et rentrez le menton.",
        "En inspirant, creusez très légèrement le dos et regardez devant vous, sans forcer.",
        "Mouvement lent et ample, mais toujours confortable."
      ],
      tips: ["Si la position à genoux gêne le genou, faites l'exercice debout, mains sur une table."],
      stop: "Douleur qui descend dans la jambe, fourmillements ou douleur dans le genou.",
      easier: "Réduisez l'amplitude, ou faites-le debout, mains appuyées sur une table.",
      yt: "chat vache exercice mobilité dos",
      frames: [
        { r: [110, 92], t: 195, h: 140, c: 10, a: [90, 90], l: [90, 0] },
        { r: [110, 92], t: 195, h: 230, c: -8, a: [90, 90], l: [90, 0] }
      ]
    },
    {
      id: "sphinx", name: "Extension douce sur les avant-bras (sphinx)", group: "Mobilité", icon: "🧘",
      dose: { type: "time", sets: 3, secs: 20 }, rest: 30,
      cap: ["Allongé sur le ventre", "Sur les avant-bras"],
      steps: [
        "Allongé sur le ventre, front posé sur les mains, jambes relâchées.",
        "Prenez appui sur les avant-bras (coudes sous les épaules) et soulevez doucement le buste. Le bassin reste au sol.",
        "Respirez calmement, laissez le bas du dos se détendre. Tenez la durée indiquée.",
        "Redescendez lentement."
      ],
      tips: ["Cette position apaise beaucoup de sciatiques, mais pas toutes : écoutez la réaction de votre jambe."],
      stop: "Si la douleur de la jambe descend plus bas (vers le mollet ou le pied) ou augmente : arrêtez et demandez conseil à votre kiné.",
      easier: "Restez à plat ventre appuyé sur les coudes à moitié, ou tenez seulement 10 secondes.",
      yt: "extension lombaire sphinx sciatique kiné",
      frames: [
        { r: [112, 121], t: 180, h: 180, a: [0, 0], l: [0, 0] },
        { r: [112, 119], t: 205, h: 200, a: [90, 180], l: [0, 0] }
      ]
    },
    {
      id: "hamstring", name: "Étirement des ischio-jambiers (doux)", group: "Mobilité", icon: "🦵",
      dose: { type: "time", sets: 2, secs: 30, perSide: true }, rest: 20,
      cap: ["Jambe à l'étirement doux", "Un peu plus haut (sans forcer)"],
      steps: [
        "Allongé sur le dos, une jambe pliée, pied au sol.",
        "Passez une serviette ou une sangle sous le pied de l'autre jambe.",
        "Montez la jambe jusqu'à sentir une tension à l'arrière de la cuisse. Le genou peut rester légèrement plié.",
        "Tenez, respirez, puis changez de jambe."
      ],
      tips: ["Intensité visée : 3 sur 10. Une tension, jamais une douleur."],
      stop: "Fourmillements, décharge électrique ou douleur qui descend dans le mollet.",
      easier: "Genou plus plié, jambe moins haute.",
      yt: "étirement ischio jambiers allongé sangle sciatique",
      frames: [
        { r: [90, 122], t: 180, h: 180, a: [-60, -50], l: [-60, -60], l2: [-55, 60],
          props: [[75, 89, 120, 70]] },
        { r: [90, 122], t: 180, h: 180, a: [-60, -50], l: [-75, -75], l2: [-55, 60],
          props: [[75, 89, 105.5, 64]] }
      ]
    },
    {
      id: "piriformis", name: "Étirement du fessier / piriforme (allongé)", group: "Mobilité", icon: "🍑",
      dose: { type: "time", sets: 2, secs: 30, perSide: true }, rest: 20,
      cap: ["Cheville sur le genou"],
      steps: [
        "Allongé sur le dos, genoux pliés, pieds au sol.",
        "Posez la cheville droite sur le genou gauche. Laissez le genou droit s'ouvrir doucement.",
        "Pour intensifier un peu, rapprochez la cuisse gauche de vous en la tenant derrière la cuisse (pas devant le tibia).",
        "Vous sentez l'étirement dans la fesse. Tenez, puis changez de côté."
      ],
      tips: ["Ne forcez jamais sur le genou : l'étirement doit se sentir dans la fesse, pas dans l'articulation du genou."],
      stop: "Douleur dans le genou ou sciatique qui augmente.",
      easier: "Laissez simplement la cheville sur le genou, sans tirer.",
      yt: "étirement piriforme allongé sciatique",
      frames: [
        { r: [90, 122], t: 180, h: 180, a: [-15, -15], l: [-105, 10], l2: [-50, 55] }
      ]
    },
    {
      id: "bridge", name: "Pont fessier", group: "Bas du corps", icon: "🌉",
      dose: { type: "reps", sets: 3, reps: 10 }, rest: 45,
      cap: ["Départ", "Bassin levé"],
      steps: [
        "Allongé sur le dos, genoux pliés (environ 90°), pieds à plat, écartés comme le bassin.",
        "Serrez les fessiers et le ventre, puis montez le bassin jusqu'à aligner épaules, hanches et genoux.",
        "Tenez 2 secondes en soufflant, puis redescendez lentement, vertèbre par vertèbre."
      ],
      tips: ["Ne cambrez pas le bas du dos : ce sont les fessiers qui travaillent."],
      stop: "Crampe ou douleur dans le bas du dos, ou douleur dans le genou.",
      easier: "Montez moins haut, sans maintien, 6 répétitions.",
      yt: "pont fessier exercice débutant mal de dos",
      frames: [
        { r: [90, 122], t: 180, h: 180, a: [-15, -15], l: [-55, 60] },
        { r: [94, 104], t: 150, h: 180, a: [0, 0], l: [-30, 90] }
      ]
    },
    {
      id: "slr", name: "Relevé de jambe tendue (couché)", group: "Bas du corps", icon: "⬆️",
      dose: { type: "reps", sets: 3, reps: 10, perSide: true }, rest: 45,
      cap: ["Jambe tendue au sol", "Jambe levée"],
      steps: [
        "Allongé sur le dos : une jambe pliée, pied au sol ; l'autre jambe tendue.",
        "Serrez la cuisse (quadriceps) de la jambe tendue, pointe du pied vers vous.",
        "Levez la jambe tendue à hauteur du genou plié, sans cambrer le dos.",
        "Redescendez lentement, 3 secondes."
      ],
      tips: ["Excellent pour renforcer la cuisse sans plier (ni charger) le genou."],
      stop: "Douleur ou fourmillements dans le bas du dos ou la jambe.",
      easier: "Contractez simplement la cuisse 5 secondes, sans lever la jambe.",
      yt: "relevé de jambe tendue quadriceps genou ménisque",
      frames: [
        { r: [90, 122], t: 180, h: 180, a: [-15, -15], l: [0, 0], l2: [-55, 60] },
        { r: [90, 122], t: 180, h: 180, a: [-15, -15], l: [-35, -35], l2: [-55, 60] }
      ]
    },
    {
      id: "sitstand", name: "Assis-debout (chaise haute)", group: "Bas du corps", icon: "🪑",
      dose: { type: "reps", sets: 3, reps: 8 }, rest: 60,
      cap: ["Assis", "Debout"],
      steps: [
        "Chaise stable et assise haute (ajoutez un coussin si besoin). Pieds largeur du bassin, genoux dans l'axe des pieds.",
        "Penchez légèrement le buste vers l'avant, dos droit, et poussez dans les talons pour vous lever.",
        "Redescendez lentement (3 secondes) sans vous laisser tomber sur la chaise."
      ],
      tips: ["Restez dans une amplitude sans douleur au genou. Plus la chaise est haute, plus c'est doux pour le ménisque."],
      stop: "Blocage, accrochage, douleur vive ou gonflement du genou.",
      easier: "Chaise plus haute, ou aidez-vous des mains sur les cuisses.",
      yt: "se lever d'une chaise exercice genou ménisque",
      frames: [
        { r: [90, 92], t: -88, h: -88, a: [20, 0], l: [0, 90],
          props: [[62, 96, 104, 96], [62, 96, 62, 56], [66, 96, 66, 122], [100, 96, 100, 122]] },
        { r: [118, 62], t: -90, h: -90, a: [20, 0], l: [90, 90],
          props: [[62, 96, 104, 96], [62, 96, 62, 56], [66, 96, 66, 122], [100, 96, 100, 122]] }
      ]
    },
    {
      id: "abduction", name: "Jambe sur le côté (debout, avec appui)", group: "Bas du corps", icon: "↔️",
      dose: { type: "reps", sets: 3, reps: 10, perSide: true }, rest: 45,
      cap: ["Départ", "Jambe écartée"],
      steps: [
        "Debout, une main sur le dossier d'une chaise, corps bien droit.",
        "Levez la jambe tendue sur le côté d'environ 30 cm, pointe du pied vers l'avant.",
        "Ne penchez pas le tronc. Redescendez lentement."
      ],
      tips: ["Renforce le fessier moyen, qui stabilise le bassin et protège le genou."],
      stop: "Douleur dans le genou ou la hanche.",
      easier: "Amplitude réduite, ou sans lever (juste contracter).",
      yt: "abduction de hanche debout fessier moyen",
      frames: [
        { raw: { head: [100, 13], lines: [
            [100, 24, 100, 62], [88, 26, 112, 26], [88, 26, 80, 44], [80, 44, 72, 58],
            [112, 26, 116, 44], [116, 44, 114, 60], [92, 62, 108, 62],
            [92, 62, 92, 92], [92, 92, 92, 122], [108, 62, 108, 92], [108, 92, 108, 122]] },
          props: [[70, 56, 70, 122], [65, 56, 77, 56]] },
        { raw: { head: [100, 13], lines: [
            [100, 24, 100, 62], [88, 26, 112, 26], [88, 26, 80, 44], [80, 44, 72, 58],
            [112, 26, 116, 44], [116, 44, 114, 60], [92, 62, 108, 62],
            [92, 62, 92, 92], [92, 92, 92, 122], [108, 62, 123, 88], [123, 88, 138, 114]] },
          props: [[70, 56, 70, 122], [65, 56, 77, 56]] }
      ]
    },
    {
      id: "calf", name: "Montées sur la pointe des pieds", group: "Bas du corps", icon: "👣",
      dose: { type: "reps", sets: 3, reps: 12 }, rest: 45,
      cap: ["Pieds à plat", "Sur la pointe"],
      steps: [
        "Debout face à un mur ou une chaise, mains en appui léger.",
        "Montez sur la pointe des pieds, tenez 1 seconde.",
        "Redescendez lentement. Genoux souples mais stables."
      ],
      tips: ["Bon pour la circulation et les mollets, sans contrainte sur le ménisque."],
      stop: "Crampe forte ou douleur au genou.",
      easier: "Version assise : talons levés, pointes au sol, puis inversement.",
      yt: "montées sur pointes de pieds mollets exercice",
      frames: [
        { r: [100, 62], t: -90, h: -90, a: [50, 50], l: [90, 90],
          props: [[126, 46, 126, 122], [118, 46, 134, 46], [100, 122, 108, 122]] },
        { r: [100, 54], t: -90, h: -90, a: [50, 50], l: [90, 90],
          props: [[126, 46, 126, 122], [118, 46, 134, 46], [100, 114, 108, 122]] }
      ]
    },
    {
      id: "kneecurl", name: "Flexion de genou debout (sans charge)", group: "Bas du corps", icon: "🦿",
      dose: { type: "reps", sets: 2, reps: 10, perSide: true }, rest: 45,
      cap: ["Départ", "Talon vers la fesse"],
      steps: [
        "Debout en appui sur une chaise, genoux souples.",
        "Pliez lentement un genou en ramenant le talon vers la fesse (environ 60 à 90°), sans bouger la cuisse.",
        "Redescendez lentement. Bassin stable, dos non cambré."
      ],
      tips: ["Pas de charge ni d'élastique au départ."],
      stop: "Douleur à l'arrière du genou : supprimez cet exercice et parlez-en à votre kiné.",
      easier: "Moins de flexion (30 à 45°).",
      yt: "flexion jambe debout ischio jambiers sans charge",
      frames: [
        { r: [100, 62], t: -90, h: -90, a: [50, 50], l: [90, 90],
          props: [[126, 46, 126, 122], [118, 46, 134, 46]] },
        { r: [100, 62], t: -90, h: -90, a: [50, 50], l: [90, 150], l2: [90, 90],
          props: [[126, 46, 126, 122], [118, 46, 134, 46]] }
      ]
    },
    {
      id: "birddog", name: "Bird-dog (quatre pattes)", group: "Dos & gainage", icon: "🐕",
      dose: { type: "reps", sets: 3, reps: 6, perSide: true }, rest: 45,
      cap: ["Départ", "Bras et jambe opposés"],
      steps: [
        "À quatre pattes (coussin sous les genoux), ventre légèrement rentré, dos neutre.",
        "Tendez un bras vers l'avant et la jambe opposée vers l'arrière, dans l'alignement du dos.",
        "Tenez 3 secondes, revenez en contrôle, changez de côté."
      ],
      tips: ["Le bassin ne bouge pas : imaginez un verre d'eau posé sur le bas du dos."],
      stop: "Dos qui se creuse, douleur sciatique ou douleur au genou.",
      easier: "Bougez seulement un bras, ou seulement une jambe.",
      yt: "bird dog exercice gainage dos",
      frames: [
        { r: [110, 92], t: 195, h: 195, a: [90, 90], l: [90, 0] },
        { r: [110, 92], t: 195, h: 195, a: [90, 90], l: [90, 0], a2: [190, 190], l2: [0, 0] }
      ]
    },
    {
      id: "deadbug", name: "Insecte mort (dead bug)", group: "Dos & gainage", icon: "🪲",
      dose: { type: "reps", sets: 3, reps: 6, perSide: true }, rest: 45,
      cap: ["Départ", "Bras et jambe opposés"],
      steps: [
        "Allongé sur le dos, bras tendus vers le plafond, hanches et genoux à 90°. Bas du dos plaqué au sol.",
        "Descendez lentement un bras derrière la tête et la jambe opposée vers le sol, sans cambrer.",
        "Revenez au centre, puis alternez."
      ],
      tips: ["Soufflez en descendant. Si le dos décolle, réduisez l'amplitude."],
      stop: "Dos qui se creuse, douleur sciatique.",
      easier: "Seulement les jambes : touchez le sol du talon, genou plié.",
      yt: "dead bug exercice gainage",
      frames: [
        { r: [90, 122], t: 180, h: 180, a: [-90, -90], l: [-90, 0] },
        { r: [90, 122], t: 180, h: 180, a: [-90, -90], l: [-90, 0], a2: [185, 185], l2: [-6, -6] }
      ]
    },
    {
      id: "plank", name: "Planche inclinée (mains sur une table)", group: "Dos & gainage", icon: "📏",
      dose: { type: "time", sets: 3, secs: 20 }, rest: 45,
      cap: ["Corps en ligne droite"],
      steps: [
        "Mains sur une table solide ou un plan de travail, bras tendus sous les épaules.",
        "Reculez les pieds : le corps forme une ligne droite des talons à la tête.",
        "Serrez le ventre et les fessiers, respirez normalement."
      ],
      tips: ["Plus la table est haute, plus c'est facile. Aucune pression sur les genoux, contrairement à la planche au sol."],
      stop: "Dos qui se creuse ou douleur sciatique.",
      easier: "Rapprochez les pieds de la table (corps plus vertical).",
      yt: "planche inclinée sur table débutant",
      frames: [
        { r: [98.6, 76], t: -50, h: -50, a: [90, 90], l: [130, 130],
          props: [[104, 89, 152, 89], [112, 89, 112, 122], [148, 89, 148, 122]] }
      ]
    },
    {
      id: "wallpush", name: "Pompes contre le mur", group: "Haut du corps", icon: "🧱",
      dose: { type: "reps", sets: 3, reps: 10 }, rest: 45,
      cap: ["Bras tendus", "Poitrine vers le mur"],
      steps: [
        "Face à un mur, mains à hauteur d'épaules, un grand pas en arrière.",
        "Fléchissez les coudes pour approcher la poitrine du mur, corps gainé en ligne droite.",
        "Poussez pour revenir."
      ],
      tips: ["Aucun impact sur le dos ni sur les genoux."],
      stop: "Douleur à l'épaule ou dans le bas du dos.",
      easier: "Rapprochez-vous du mur.",
      yt: "pompes contre le mur",
      frames: [
        { r: [78.6, 65], t: -72, h: -72, a: [0, 0], l: [108, 108], props: [[132, 10, 132, 122]] },
        { r: [90, 70], t: -60, h: -60, a: [60, -57], l: [120, 120], props: [[132, 10, 132, 122]] }
      ]
    },
    {
      id: "row", name: "Tirage avec élastique (debout)", group: "Haut du corps", icon: "🎽",
      dose: { type: "reps", sets: 3, reps: 12 }, rest: 45,
      cap: ["Bras tendus", "Coudes en arrière"],
      steps: [
        "Fixez un élastique à une poignée de porte, à hauteur de poitrine.",
        "Debout, pieds largeur du bassin, genoux souples, dos droit.",
        "Tirez les coudes vers l'arrière en rapprochant les omoplates, tenez 1 seconde, relâchez lentement."
      ],
      tips: ["Évitez de vous pencher en avant : gardez le buste droit."],
      stop: "Douleur dans le dos ou l'épaule.",
      easier: "Élastique plus souple, ou assis sur une chaise.",
      yt: "tirage élastique debout dos exercice",
      frames: [
        { r: [100, 62], t: -90, h: -90, a: [0, 0], l: [90, 90], props: [[140, 24, 172, 32]] },
        { r: [100, 62], t: -90, h: -90, a: [120, 0], l: [90, 90], props: [[110, 41, 172, 32]] }
      ]
    },
    {
      id: "curl", name: "Curl biceps (haltères légers)", group: "Haut du corps", icon: "💪",
      dose: { type: "reps", sets: 3, reps: 10 }, rest: 45,
      cap: ["Bras le long du corps", "Avant-bras plié"],
      steps: [
        "Debout (ou assis), un haltère léger ou une bouteille d'eau dans chaque main, coudes collés au corps.",
        "Montez les avant-bras, tenez 1 seconde.",
        "Redescendez en 3 secondes, sans balancer le dos."
      ],
      tips: ["Choisissez une charge qui permet de finir les séries sans vous cambrer."],
      stop: "Douleur au coude ou au dos.",
      easier: "Charge plus légère, ou version assise.",
      yt: "curl biceps haltères débutant",
      frames: [
        { r: [100, 62], t: -90, h: -90, a: [70, 80], l: [90, 90] },
        { r: [100, 62], t: -90, h: -90, a: [70, -70], l: [90, 90] }
      ]
    },
    {
      id: "walk", name: "Marche active", group: "Cardio doux", icon: "🚶",
      dose: { type: "cardio", mins: 20 }, rest: 0,
      cap: ["Pas 1", "Pas 2"],
      steps: [
        "Chaussures amortissantes, terrain plat et régulier.",
        "Allure à laquelle vous pouvez parler mais pas chanter.",
        "Augmentez la durée de 2 minutes par semaine si tout se passe bien (commencez à 10-15 min)."
      ],
      tips: ["La marche est l'activité la plus utile pour perdre du poids avec un dos et un genou fragiles. Fractionner (3 × 10 min) fonctionne aussi."],
      stop: "Douleur sciatique qui augmente au fil de la marche, ou genou qui gonfle ou se bloque.",
      easier: "Plusieurs marches de 5 à 10 minutes dans la journée.",
      yt: "marche santé conseils sciatique",
      frames: [
        { r: [100, 62], t: -90, h: -90, a: [110, 120], a2: [70, 60], l: [70, 100], l2: [110, 120] },
        { r: [100, 62], t: -90, h: -90, a: [70, 60], a2: [110, 120], l: [110, 120], l2: [70, 100] }
      ]
    },
    {
      id: "bike", name: "Vélo d'appartement (selle haute)", group: "Cardio doux", icon: "🚴",
      dose: { type: "cardio", mins: 20 }, rest: 0, frames: null,
      steps: [
        "Réglez la selle assez haute : en bas de la pédale, le genou reste peu plié (environ 25 à 35°).",
        "Résistance faible, pédalage fluide (70 à 90 tours/minute).",
        "Redressez un peu le guidon pour ne pas trop arrondir le bas du dos."
      ],
      tips: ["Sans impact : très bien pour le ménisque, si la selle est haute et la résistance faible."],
      stop: "Douleur au genou en bas de pédale, ou sciatique qui augmente.",
      easier: "10 minutes sans résistance.",
      yt: "réglage vélo d'appartement genou"
    },
    {
      id: "bikeout", name: "Vélo d'extérieur (terrain plat)", group: "Cardio doux", icon: "🚲",
      dose: { type: "cardio", mins: 30 }, rest: 0, frames: null,
      steps: [
        "Choisissez un parcours plat et régulier (piste cyclable, chemin), loin de la circulation si possible.",
        "Réglez la selle assez haute (genou peu plié en bas de pédale) et gardez un petit braquet : pédalez léger et souple.",
        "Redressez un peu le guidon pour ne pas trop arrondir le bas du dos."
      ],
      tips: ["Évitez les côtes raides et les démarrages en force, qui chargent le genou et le dos."],
      stop: "Douleur au genou en bas de pédale, sciatique qui augmente, ou malaise.",
      easier: "15 minutes sur terrain plat, sans forcer.",
      yt: "réglage selle vélo hauteur genou"
    },
    {
      id: "swim", name: "Natation / aquagym", group: "Cardio doux", icon: "🏊",
      dose: { type: "cardio", mins: 25 }, rest: 0, frames: null,
      steps: [
        "L'eau porte le poids du corps : idéal pour le dos et les genoux.",
        "Privilégiez le crawl, le dos crawlé ou la marche dans l'eau.",
        "Évitez la brasse (le mouvement de jambes sollicite le genou) et le papillon (cambre le dos)."
      ],
      tips: ["Aquagym et marche en piscine sont d'excellentes options les jours un peu sensibles."],
      stop: "Douleur au genou en battant des jambes, ou sciatique qui augmente.",
      easier: "Marche dans l'eau jusqu'à la taille, 15 minutes.",
      yt: "aquagym dos genoux"
    }
  ],

  sessions: [
    {
      id: "douce", name: "Séance douce", tag: "Jours de douleur",
      desc: "Mobilité et étirements très doux, pour les jours où le dos ou le genou sont sensibles.",
      items: [
        { id: "catcamel", sets: 1, reps: 8 }, { id: "sphinx", sets: 2, secs: 20 },
        { id: "hamstring", sets: 1, secs: 30 }, { id: "piriformis", sets: 1, secs: 30 },
        { id: "bridge", sets: 1, reps: 8 }
      ]
    },
    {
      id: "A", name: "Séance A : jambes et fessiers", tag: "Renforcement",
      desc: "Renforce les muscles qui protègent le genou et le bas du dos, sans flexion profonde ni impact.",
      items: [
        { id: "catcamel", sets: 1, reps: 8 }, { id: "bridge" }, { id: "slr" }, { id: "sitstand" },
        { id: "abduction" }, { id: "calf" }, { id: "kneecurl" }, { id: "hamstring", sets: 1 }
      ]
    },
    {
      id: "B", name: "Séance B : haut du corps et gainage", tag: "Renforcement",
      desc: "Bras, dos et ventre, avec des positions qui épargnent le dos et les genoux.",
      items: [
        { id: "catcamel", sets: 1, reps: 8 }, { id: "wallpush" }, { id: "row" }, { id: "curl" },
        { id: "deadbug" }, { id: "birddog" }, { id: "plank" }
      ]
    },
    {
      id: "C", name: "Séance C : cardio doux et souplesse", tag: "Cardio + étirements",
      desc: "Marche (ou vélo, ou piscine) puis étirements pour garder de la souplesse.",
      items: [
        { id: "walk", mins: 20 }, { id: "hamstring" }, { id: "piriformis" },
        { id: "sphinx", sets: 2 }, { id: "catcamel", sets: 1, reps: 8 }
      ]
    }
  ],

  safety: {
    intro: "Cette application ne remplace pas un avis médical. Avec une sciatique et un ménisque fissuré, parlez-en à votre médecin ou à votre kinésithérapeute avant de commencer, et montrez-leur ces exercices.",
    rules: [
      "Pendant l'effort, la douleur doit rester à 3/10 maximum, et revenir à votre niveau habituel dans l'heure qui suit.",
      "Une douleur qui descend plus bas dans la jambe, des fourmillements qui augmentent ou une douleur vive au genou : arrêtez l'exercice.",
      "Si vos douleurs sont à 7/10 ou plus le matin, faites seulement de la marche très douce ou reposez-vous.",
      "Échauffez-vous toujours (séance douce ou quelques minutes de marche) et progressez lentement."
    ],
    avoid: [
      "Squats profonds, fentes profondes, s'accroupir.",
      "Rester à genoux longtemps sur un sol dur.",
      "Courir, sauter, tous les sports à impacts.",
      "Pivoter le corps pied bloqué au sol (sports de balle, danse).",
      "Se pencher en avant avec une charge, abdos type « crunch », rester assis des heures."
    ],
    urgent: [
      "Engourdissement de la région génitale ou de l'entrejambe, difficultés nouvelles à uriner ou à aller à la selle, faiblesse brutale ou pied qui « tombe » : appelez le 15 ou le 112 sans attendre.",
      "Genou bloqué (impossible de l'étendre), gonflement important, chaleur, rougeur ou fièvre : consultez rapidement."
    ],
    weight: "Pour perdre du poids durablement, visez une perte lente et régulière (de l'ordre de 0,25 à 0,5 kg par semaine), la marche presque tous les jours, un bon sommeil et une alimentation sans régime extrême. Un médecin ou un diététicien peut vous accompagner."
  }
};

/* ===== Matériel, échauffements et exercices sans matériel ===== */
(function () {
  var D = window.DATA, EXO = {};
  D.groups.unshift('Échauffement');
  D.equipment = [
    { id: 'chaise', name: 'Chaise stable', short: 'chaise', def: true },
    { id: 'table', name: 'Table ou plan de travail solide', short: 'table', def: true },
    { id: 'tapis', name: 'Tapis de sol (ou serviette épaisse)', short: 'tapis', def: true },
    { id: 'bouteilles', name: 'Objets du quotidien (bouteilles d\'eau, sac à dos)', short: 'bouteilles ou sac à dos', def: true },
    { id: 'halteres', name: 'Haltères ou kettlebell', short: 'haltères', def: false },
    { id: 'elastique', name: 'Bande élastique', short: 'élastique', def: false },
    { id: 'velo', name: 'Vélo d\'appartement', short: 'vélo d\'appartement', def: false },
    { id: 'velo_ext', name: 'Vélo d\'extérieur', short: 'vélo d\'extérieur', def: false },
    { id: 'piscine', name: 'Accès à une piscine', short: 'piscine', def: false }
  ];

  var LEGS = [[92, 62, 108, 62], [92, 62, 92, 92], [92, 92, 92, 122], [108, 62, 108, 92], [108, 92, 108, 122]];
  var FRONT = function (head, lines) { return { raw: { head: head, lines: lines.concat(LEGS) } }; };

  D.exos.push({
    id: 'marchplace', name: 'Marche sur place', group: 'Échauffement', icon: '🚶', warm: true,
    dose: { type: 'time', sets: 1, secs: 60 }, rest: 0,
    cap: ['Genou levé', 'Autre genou'],
    steps: [
      'Debout, pieds largeur du bassin, près d\'un appui si besoin.',
      'Marchez sur place en levant les genoux à peine, bras qui balancent naturellement.',
      'Augmentez très progressivement le rythme au fil de la durée.'
    ],
    tips: ['Le but est de réchauffer le corps : vous devez pouvoir parler sans effort.'],
    stop: 'Douleur au genou, douleur qui descend dans la jambe ou essoufflement anormal.',
    easier: 'Moins longtemps, ou assis : alternez les talons qui montent.',
    yt: 'marche sur place échauffement douce',
    frames: [
      { r: [100, 62], t: -90, h: -90, a: [110, 120], a2: [70, 60], l: [40, 100], l2: [90, 90] },
      { r: [100, 62], t: -90, h: -90, a: [70, 60], a2: [110, 120], l: [90, 90], l2: [40, 100] }
    ]
  });
  D.exos.push({
    id: 'shoulders', name: 'Cercles d\'épaules', group: 'Échauffement', icon: '🤷', warm: true,
    dose: { type: 'reps', sets: 1, reps: 8 }, rest: 0,
    cap: ['Épaules détendues', 'Épaules montées'],
    steps: [
      'Debout ou assis, bras relâchés le long du corps.',
      'Montez les épaules vers les oreilles, reculez-les, puis redescendez en un grand cercle lent.',
      'Faites 8 cercles vers l\'arrière, puis 8 vers l\'avant.'
    ],
    tips: ['Détendez la nuque et respirez calmement.'],
    stop: 'Douleur vive à l\'épaule ou au cou.',
    easier: 'Petits cercles, un seul sens.',
    yt: 'cercles d\'épaules échauffement',
    frames: [
      FRONT([100, 13], [[100, 24, 100, 62], [88, 26, 112, 26], [88, 26, 84, 46], [84, 46, 84, 66], [112, 26, 116, 46], [116, 46, 116, 66]]),
      FRONT([100, 16], [[100, 27, 100, 62], [88, 21, 112, 21], [88, 21, 84, 41], [84, 41, 84, 61], [112, 21, 116, 41], [116, 41, 116, 61]])
    ]
  });
  D.exos.push({
    id: 'armcircles', name: 'Cercles de bras', group: 'Échauffement', icon: '🔄', warm: true,
    dose: { type: 'reps', sets: 1, reps: 10 }, rest: 0,
    cap: ['Bras à l\'horizontale', 'Bras levés en diagonale'],
    steps: [
      'Debout, bras écartés à hauteur d\'épaules.',
      'Dessinez de petits cercles avec les bras, puis de plus en plus grands.',
      'Faites 10 cercles vers l\'avant puis 10 vers l\'arrière.'
    ],
    tips: ['Gardez le buste droit et les épaules basses.'],
    stop: 'Douleur à l\'épaule.',
    easier: 'Cercles plus petits, bras plus bas.',
    yt: 'cercles de bras échauffement épaules',
    frames: [
      FRONT([100, 13], [[100, 24, 100, 62], [88, 26, 112, 26], [88, 26, 68, 28], [68, 28, 48, 30], [112, 26, 132, 28], [132, 28, 152, 30]]),
      FRONT([100, 13], [[100, 24, 100, 62], [88, 26, 112, 26], [88, 26, 76, 14], [76, 14, 64, 2], [112, 26, 124, 14], [124, 14, 136, 2]])
    ]
  });
  D.exos.push({
    id: 'chestopen', name: 'Ouverture de la poitrine', group: 'Échauffement', icon: '🤗', warm: true,
    dose: { type: 'reps', sets: 1, reps: 10 }, rest: 0,
    cap: ['Bras croisés devant', 'Bras ouverts en arrière'],
    steps: [
      'Debout, croisez les bras devant vous en vous arrondissant légèrement.',
      'Ouvrez les bras largement sur les côtés en poussant la poitrine vers l\'avant, sans cambrer le bas du dos.',
      'Revenez en croisant les bras, en soufflant.'
    ],
    tips: ['Le mouvement vient des épaules et du haut du dos, pas du bas du dos.'],
    stop: 'Douleur à l\'épaule ou dans le dos.',
    easier: 'Mouvement plus petit.',
    yt: 'ouverture de poitrine échauffement',
    frames: [
      FRONT([100, 13], [[100, 24, 100, 62], [88, 26, 112, 26], [88, 26, 92, 40], [92, 40, 106, 37], [112, 26, 108, 40], [108, 40, 94, 37]]),
      FRONT([100, 13], [[100, 24, 100, 62], [88, 26, 112, 26], [88, 26, 68, 28], [68, 28, 48, 30], [112, 26, 132, 28], [132, 28, 152, 30]])
    ]
  });
  D.exos.push({
    id: 'pelvictilt', name: 'Bascule du bassin (allongé)', group: 'Échauffement', icon: '⚖️', warm: true,
    dose: { type: 'reps', sets: 1, reps: 10 }, rest: 0, eq: ['tapis'],
    noeq: 'Sans tapis : allongez-vous sur une serviette de bain épaisse, une couette pliée ou une moquette.',
    cap: ['Bas du dos légèrement creusé', 'Bas du dos plaqué au sol'],
    steps: [
      'Allongé sur le dos, genoux pliés, pieds à plat, bras le long du corps.',
      'En soufflant, rentrez le ventre et plaquez doucement le bas du dos au sol (le bassin bascule).',
      'En inspirant, relâchez sans creuser exagérément. Mouvement lent et petit.'
    ],
    tips: ['Très doux pour le bas du dos : il prépare les muscles profonds du ventre.'],
    stop: 'Douleur qui augmente ou qui descend dans la jambe.',
    easier: 'Mouvement encore plus petit.',
    yt: 'bascule du bassin allongé exercice dos',
    frames: [
      { r: [90, 122], t: 180, h: 180, c: 4, a: [-15, -15], l: [-55, 60] },
      { r: [90, 122], t: 180, h: 180, c: 0, a: [-15, -15], l: [-55, 60] }
    ]
  });
  D.exos.push({
    id: 'wallrow', name: 'Tirage coudes en arrière contre le mur (sans matériel)', group: 'Haut du corps', icon: '🧱',
    dose: { type: 'reps', sets: 3, reps: 10 }, rest: 45,
    cap: ['Bras devant', 'Coudes en arrière'],
    steps: [
      'Debout, dos à environ 10 cm d\'un mur, genoux souples, bras tendus devant vous.',
      'Pliez les coudes et poussez-les en arrière contre le mur, omoplates serrées, en tenant 2 secondes.',
      'Revenez lentement. Gardez le buste droit.'
    ],
    tips: ['Remplace le tirage à l\'élastique : le même mouvement, sans matériel.'],
    stop: 'Douleur dans l\'épaule ou le dos.',
    easier: 'Tenez 1 seconde seulement.',
    yt: 'rétraction omoplates debout contre mur',
    frames: [
      { r: [76, 62], t: -90, h: -90, a: [0, 0], l: [90, 90], props: [[60, 8, 60, 122]] },
      { r: [76, 62], t: -90, h: -90, a: [120, 0], l: [90, 90], props: [[60, 8, 60, 122]] }
    ]
  });
  D.exos.push({
    id: 'selfcurl', name: 'Curl en auto-résistance (sans matériel)', group: 'Haut du corps', icon: '💪',
    dose: { type: 'reps', sets: 3, reps: 8, perSide: true }, rest: 45,
    cap: ['Bras tendu', 'Avant-bras plié'],
    steps: [
      'Debout ou assis, coude collé au corps, paume vers le haut.',
      'Avec l\'autre main, appuyez sur le dessus de l\'avant-bras pour offrir une résistance.',
      'Pliez le coude lentement (3 secondes) contre cette résistance, puis redescendez lentement. Changez de bras.'
    ],
    tips: ['Réglez la résistance de la main libre : l\'effort doit être sérieux mais contrôlé.'],
    stop: 'Douleur au coude ou à l\'épaule.',
    easier: 'Moins de résistance.',
    yt: 'curl biceps auto résistance sans matériel',
    frames: [
      { r: [100, 62], t: -90, h: -90, a: [70, 80], l: [90, 90] },
      { r: [100, 62], t: -90, h: -90, a: [70, -70], l: [90, 90] }
    ]
  });

  D.exos.forEach(function (e) { EXO[e.id] = e; });
  function eq(ids, list, noeq, sub) {
    ids.split(' ').forEach(function (id) {
      var e = EXO[id]; if (!e) return;
      e.eq = list.split(' ');
      if (noeq) e.noeq = noeq;
      if (sub) e.sub = sub;
    });
  }
  var FLOOR = 'Sans tapis : utilisez une serviette de bain épaisse, une couette pliée ou une moquette.';
  var SUPPORT = 'Sans chaise ni table : appuyez-vous d\'une main contre un mur.';
  var WEIGHT = 'Sans haltères ni objets lourds : faites le même mouvement avec les mains vides, plus lentement (3 secondes à la descente).';
  
  eq('catcamel sphinx hamstring piriformis bridge slr birddog deadbug', 'tapis', FLOOR);
  eq('sitstand', 'chaise', 'Sans chaise : utilisez le bord d\'un canapé ou d\'un lit stable, assez haut.');
  eq('abduction calf kneecurl', 'chaise table', SUPPORT);
  eq('plank', 'table', 'Sans table : posez les mains contre un mur, corps incliné (un peu moins difficile).');
  eq('row', 'elastique', 'Sans élastique : poussez les coudes en arrière contre un mur.', 'wallrow');
  eq('curl', 'halteres bouteilles', 'Sans haltères ni objets : résistez avec l\'autre main (curl en auto-résistance).', 'selfcurl');
  eq('bike', 'velo'); eq('bikeout', 'velo_ext'); eq('swim', 'piscine');

  function S(id) { return D.sessions.filter(function (s) { return s.id === id; })[0]; }
  S('douce').items = [
    { id: 'pelvictilt', w: true }, { id: 'shoulders', w: true, reps: 6 }, { id: 'catcamel', w: true, sets: 1, reps: 8 },
    { id: 'sphinx', sets: 2, secs: 20 }, { id: 'hamstring', sets: 1, secs: 30 }, { id: 'piriformis', sets: 1, secs: 30 }, { id: 'bridge', sets: 1, reps: 8 }
  ];
  S('A').items = [
    { id: 'marchplace', w: true }, { id: 'pelvictilt', w: true }, { id: 'catcamel', w: true, sets: 1, reps: 8 },
    { id: 'bridge' }, { id: 'slr' }, { id: 'sitstand' }, { id: 'abduction' }, { id: 'calf' }, { id: 'kneecurl' }, { id: 'hamstring', sets: 1 }
  ];
  S('B').items = [
    { id: 'marchplace', w: true }, { id: 'shoulders', w: true }, { id: 'armcircles', w: true }, { id: 'chestopen', w: true }, { id: 'catcamel', w: true, sets: 1, reps: 8 },
    { id: 'wallpush' }, { id: 'row' }, { id: 'curl' }, { id: 'deadbug' }, { id: 'birddog' }, { id: 'plank' }
  ];
  S('C').items = [
    { id: 'shoulders', w: true }, { id: 'chestopen', w: true }, { id: 'walk', mins: 20 },
    { id: 'hamstring' }, { id: 'piriformis' }, { id: 'sphinx', sets: 2 }, { id: 'catcamel', sets: 1, reps: 8 }
  ];

})();
