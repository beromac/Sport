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
      "Après une rupture du tendon d'Achille : douleur vive ou « claquement » au tendon, impossibilité de vous appuyer, ou mollet gonflé, chaud, rouge ou douloureux d'un seul côté (risque de phlébite) : consultez rapidement.",
      "Engourdissement de la région génitale ou de l'entrejambe, difficultés nouvelles à uriner ou à aller à la selle, faiblesse brutale ou pied qui « tombe » : appelez le 15 ou le 112 sans attendre.",
      "Genou bloqué (impossible de l'étendre), gonflement important, chaleur, rougeur ou fièvre : consultez rapidement."
    ],
    achille: [
      "Les exercices du groupe « Équilibre & cheville » sont à commencer seulement avec l'accord de votre chirurgien ou de votre kinésithérapeute, selon l'étape de votre protocole (type d'appui, botte ou chaussure, reprise des montées sur la pointe).",
      "Douleur au tendon : 3/10 maximum pendant l'exercice, sans gonflement ni raideur plus forte le lendemain.",
      "Pas d'étirement forcé du mollet, pas de saut, de course ni de changement de direction brusque tant que ce n'est pas validé.",
      "Travaillez près d'un appui, sur un sol non glissant, jamais seul(e) sur une surface instable."
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


  /* ===== Équilibre et cheville (après rupture du tendon d'Achille) ===== */
  D.groups.splice(D.groups.indexOf('Cardio doux'), 0, 'Équilibre & cheville');
  D.equipment.push({ id: 'coussin', name: 'Coussin ferme ou oreiller épais (surface instable)', short: 'coussin', def: false });
  var RX = 'Réservé à la rééducation : à faire seulement avec l\'accord de votre chirurgien ou de votre kinésithérapeute, selon l\'étape de votre protocole.';
  var POST = [[126, 46, 126, 122], [118, 46, 134, 46]];
  var WALL = [[132, 10, 132, 122]];
  function shiftFrame(dx) {
    var tx = 100 + dx, px = 100 + dx * 0.6;
    return { raw: { head: [tx, 13], lines: [
      [tx, 24, tx, 62], [tx - 12, 26, tx + 12, 26], [tx - 12, 26, tx - 14, 44], [tx - 14, 44, tx - 14, 58], [tx + 12, 26, tx + 14, 44], [tx + 14, 44, tx + 14, 58],
      [px - 8, 62, px + 8, 62], [px - 8, 62, 90 + dx * 0.3, 92], [90 + dx * 0.3, 92, 84, 122], [px + 8, 62, 110 + dx * 0.3, 92], [110 + dx * 0.3, 92, 116, 122]] } };
  }
  D.exos.push({
    id: 'ankcirc', name: 'Cercles et alphabet avec la cheville (assis)', group: 'Équilibre & cheville', icon: '🦶',
    dose: { type: 'reps', sets: 2, reps: 10, perSide: true }, rest: 20,
    cap: ['Pied tiré vers vous', 'Pied pointé'],
    steps: [
      'Assis au bord d\'une chaise, une jambe tendue devant vous, talon posé au sol ou jambe un peu levée.',
      'Dessinez de grands cercles lents avec le pied, dans un sens puis dans l\'autre. Vous pouvez aussi « écrire » l\'alphabet avec le gros orteil.',
      'Le mouvement vient de la cheville, pas de la jambe. Faites les deux côtés.'
    ],
    tips: [RX, 'Mouvements lents et sans forcer : le but est de retrouver de la mobilité et de réveiller la cheville.'],
    stop: 'Douleur vive ou tiraillement au tendon d\'Achille, gonflement de la cheville.',
    easier: 'Cercles plus petits, ou seulement pied tiré puis pointé, sans forcer en fin de course.',
    yt: 'mobilité cheville après rupture tendon d\'Achille exercices',
    frames: [
      { r: [100, 92], t: -90, h: -90, a: [80, 90], l: [-5, -5], props: [[86, 94, 116, 94], [88, 94, 88, 122], [114, 94, 114, 122], [159.8, 86.8, 156, 74]] },
      { r: [100, 92], t: -90, h: -90, a: [80, 90], l: [-5, -5], props: [[86, 94, 116, 94], [88, 94, 88, 122], [114, 94, 114, 122], [159.8, 86.8, 172, 92]] }
    ]
  });
  D.exos.push({
    id: 'bandankle', name: 'Cheville contre élastique (tirer, pointer, côtés)', group: 'Équilibre & cheville', icon: '🎗️',
    dose: { type: 'reps', sets: 2, reps: 12, perSide: true }, rest: 30,
    cap: ['Pied tiré', 'Pied pointé'],
    steps: [
      'Assis, jambe tendue devant vous. Passez une bande élastique autour de l\'avant du pied et tenez les deux bouts (ou accrochez-la à un pied de meuble).',
      'Pointez lentement le pied contre la résistance en 2 secondes, revenez en 3 secondes.',
      'Puis faites aussi tirer le pied vers vous, et les mouvements vers l\'intérieur et l\'extérieur si votre kiné vous l\'a conseillé.'
    ],
    tips: [RX, 'Choisissez une bande légère au début : la résistance doit rester facile.'],
    stop: 'Douleur dans le tendon d\'Achille, douleur vive ou crampe au mollet.',
    easier: 'Sans élastique : mêmes mouvements du pied, lentement, sans résistance.',
    yt: 'renforcement cheville élastique après rupture achille',
    frames: [
      { r: [100, 92], t: -90, h: -90, a: [80, 90], l: [-5, -5], props: [[86, 94, 116, 94], [88, 94, 88, 122], [114, 94, 114, 122], [159.8, 86.8, 156, 74], [156, 74, 190, 82], [190, 70, 190, 100]] },
      { r: [100, 92], t: -90, h: -90, a: [80, 90], l: [-5, -5], props: [[86, 94, 116, 94], [88, 94, 88, 122], [114, 94, 114, 122], [159.8, 86.8, 172, 92], [172, 92, 190, 82], [190, 70, 190, 100]] }
    ]
  });
  D.exos.push({
    id: 'shift', name: 'Transfert du poids d\'un pied à l\'autre', group: 'Équilibre & cheville', icon: '⚖️',
    dose: { type: 'reps', sets: 2, reps: 10 }, rest: 30,
    cap: ['Poids à gauche', 'Poids à droite'],
    steps: [
      'Debout, pieds écartés de la largeur des épaules, genoux souples, près d\'un appui.',
      'Déplacez lentement le poids du corps sur un pied, puis sur l\'autre, en gardant le dos droit.',
      'Un aller-retour compte pour une répétition. Gardez les deux pieds bien à plat.'
    ],
    tips: [RX, 'Au début, ne mettez sur le pied opéré que le poids que votre kiné autorise : le reste sur l\'autre pied.'],
    stop: 'Douleur dans le tendon, sensation d\'instabilité ou douleur au genou.',
    easier: 'Déplacement plus petit, mains posées sur une table.',
    yt: 'transfert de poids rééducation cheville appui',
    frames: [shiftFrame(-8), shiftFrame(8)]
  });
  D.exos.push({
    id: 'bipodal', name: 'Équilibre debout, pieds serrés', group: 'Équilibre & cheville', icon: '🧍',
    dose: { type: 'time', sets: 3, secs: 30 }, rest: 30,
    cap: ['Debout droit', 'Léger balancement'],
    steps: [
      'Debout près d\'un mur ou d\'un plan de travail, pieds serrés, bras le long du corps.',
      'Regardez un point fixe devant vous. Gardez le corps droit, sans vous appuyer.',
      'Tenez le temps indiqué. Posez une main sur l\'appui dès que vous perdez l\'équilibre.'
    ],
    tips: [RX, 'Respirez normalement, serrez légèrement les fessiers et gardez les genoux souples.'],
    stop: 'Douleur au tendon, au genou ou dans le dos.',
    easier: 'Pieds écartés de la largeur du bassin, une main sur l\'appui.',
    yt: 'équilibre bipodal rééducation proprioception',
    frames: [
      { r: [100, 62], t: -90, h: -90, a: [70, 80], l: [90, 90], props: WALL },
      { r: [100, 62], t: -93, h: -93, a: [80, 85], l: [90, 90], props: WALL }
    ]
  });
  D.exos.push({
    id: 'tandem', name: 'Équilibre pieds en ligne (un pied devant l\'autre)', group: 'Équilibre & cheville', icon: '📏',
    dose: { type: 'time', sets: 3, secs: 20, perSide: true }, rest: 30,
    cap: ['Un pied devant', 'Pieds inversés'],
    steps: [
      'Debout près d\'un appui, placez un pied juste devant l\'autre, talon contre orteils, comme sur une ligne.',
      'Tenez la position, bras légèrement écartés, regard devant vous.',
      'À la moitié du temps (le bip vous prévient), changez le pied qui est devant.'
    ],
    tips: [RX, 'Répartissez le poids sur les deux pieds, sans vous crisper.'],
    stop: 'Douleur au tendon d\'Achille ou perte d\'équilibre répétée.',
    easier: 'Pieds un peu écartés d\'une largeur de main, une main sur l\'appui.',
    yt: 'équilibre tandem pieds en ligne rééducation',
    frames: [
      { r: [100, 62], t: -90, h: -90, a: [30, 30], l: [78, 92], l2: [102, 88], props: WALL },
      { r: [100, 62], t: -90, h: -90, a: [30, 30], l: [102, 88], l2: [78, 92], props: WALL }
    ]
  });
  D.exos.push({
    id: 'monowall', name: 'Équilibre sur un pied (avec appui)', group: 'Équilibre & cheville', icon: '🦩',
    dose: { type: 'time', sets: 3, secs: 20, perSide: true }, rest: 30,
    cap: ['Pied soulevé', 'Genou un peu plus haut'],
    steps: [
      'Debout, une main sur le dossier d\'une chaise ou sur un plan de travail stable.',
      'Soulevez un pied de quelques centimètres et tenez sur l\'autre jambe, genou souple, bassin à niveau.',
      'À la moitié du temps (le bip vous prévient), changez de jambe.'
    ],
    tips: [RX, 'Vous ne devez pas peser sur la main : elle est là pour vous rassurer.', 'Pas besoin de lever haut le genou : quelques centimètres suffisent.'],
    stop: 'Douleur au tendon d\'Achille, au genou ou dans la jambe.',
    easier: 'Le bout du pied soulevé reste posé au sol.',
    yt: 'équilibre unipodal avec appui rééducation cheville',
    frames: [
      { r: [100, 62], t: -90, h: -90, a: [50, 50], l: [90, 90], l2: [60, 100], props: POST },
      { r: [100, 62], t: -90, h: -90, a: [50, 50], l: [90, 90], l2: [40, 100], props: POST }
    ]
  });
  D.exos.push({
    id: 'monofree', name: 'Équilibre sur un pied (sans appui)', group: 'Équilibre & cheville', icon: '🦩',
    dose: { type: 'time', sets: 2, secs: 30, perSide: true }, rest: 30,
    cap: ['Bras écartés', 'Genou levé'],
    steps: [
      'Debout à côté d\'un mur ou d\'un meuble, à portée de main, sans vous appuyer.',
      'Soulevez un pied et tenez sur l\'autre jambe, bras légèrement écartés, regard fixé devant vous.',
      'À la moitié du temps (le bip vous prévient), changez de jambe.'
    ],
    tips: [RX, 'À essayer seulement quand l\'équilibre sur un pied avec appui est facile et sans douleur.'],
    stop: 'Douleur au tendon, au genou ou perte d\'équilibre répétée.',
    easier: 'Revenez à « Équilibre sur un pied (avec appui) ».',
    yt: 'équilibre unipodal sans appui proprioception',
    frames: [
      { r: [100, 62], t: -90, h: -90, a: [10, 10], l: [90, 90], l2: [50, 100], props: WALL },
      { r: [100, 62], t: -90, h: -90, a: [20, 20], l: [90, 90], l2: [40, 100], props: WALL }
    ]
  });
  D.exos.push({
    id: 'eyesclosed', name: 'Équilibre yeux fermés (près d\'un appui)', group: 'Équilibre & cheville', icon: '🙈',
    dose: { type: 'time', sets: 3, secs: 20 }, rest: 30,
    cap: ['Yeux fermés', 'Léger balancement'],
    steps: [
      'Debout, pieds largeur du bassin, tout près d\'un mur ou d\'un plan de travail.',
      'Fermez les yeux et gardez la position, bras le long du corps.',
      'Rouvrez les yeux ou posez la main sur l\'appui dès que vous perdez l\'équilibre.'
    ],
    tips: [RX, 'Les yeux fermés rendent l\'exercice plus difficile : c\'est la cheville et le pied qui travaillent.'],
    stop: 'Étourdissement, douleur au tendon ou perte d\'équilibre répétée.',
    easier: 'Gardez les yeux ouverts, ou fermez-les seulement 5 secondes à la fois.',
    yt: 'équilibre yeux fermés proprioception exercice',
    frames: [
      { r: [100, 62], t: -90, h: -90, a: [70, 80], l: [90, 90], props: WALL },
      { r: [100, 62], t: -92, h: -92, a: [85, 85], l: [90, 90], props: WALL }
    ]
  });
  D.exos.push({
    id: 'foam', name: 'Équilibre sur un pied sur coussin', group: 'Équilibre & cheville', icon: '🛏️',
    dose: { type: 'time', sets: 2, secs: 20, perSide: true }, rest: 30,
    cap: ['Sur le coussin', 'Genou levé'],
    steps: [
      'Posez un coussin ferme au sol, près d\'un appui, et montez dessus sur les deux pieds.',
      'Soulevez un pied et tenez sur l\'autre, bras légèrement écartés, regard devant vous.',
      'À la moitié du temps (le bip vous prévient), changez de jambe.'
    ],
    tips: [RX, 'À réserver aux étapes avancées, quand l\'équilibre sur sol dur est facile.'],
    stop: 'Douleur au tendon ou au genou, ou impossibilité de garder l\'équilibre.',
    easier: 'Restez sur les deux pieds sur le coussin, une main sur l\'appui.',
    yt: 'équilibre sur coussin instable rééducation cheville',
    frames: [
      { r: [100, 60], t: -90, h: -90, a: [10, 10], l: [90, 90], l2: [50, 100], props: [[80, 118, 120, 118], [84, 122, 116, 122], [132, 10, 132, 122]] },
      { r: [100, 60], t: -91, h: -91, a: [20, 20], l: [90, 90], l2: [40, 100], props: [[80, 118, 120, 118], [84, 122, 116, 122], [132, 10, 132, 122]] }
    ]
  });
  D.exos.push({
    id: 'heelwalk', name: 'Marche pieds en ligne, talon-pointe', group: 'Équilibre & cheville', icon: '🚶',
    dose: { type: 'time', sets: 2, secs: 30 }, rest: 30,
    cap: ['Pied devant', 'Autre pied devant'],
    steps: [
      'Choisissez un couloir ou une ligne de 3 à 4 mètres, près d\'un mur.',
      'Avancez en posant le talon d\'un pied juste devant les orteils de l\'autre, comme sur un fil.',
      'Allez lentement, regard devant vous, bras légèrement écartés. Faites demi-tour sans pivoter pied bloqué.'
    ],
    tips: [RX, 'Marchez pieds nus ou chaussés selon l\'avis de votre kiné, sur un sol non glissant.'],
    stop: 'Douleur au tendon, au genou ou dans la jambe.',
    easier: 'Pas plus larges, main sur le mur.',
    yt: 'marche talon pointe équilibre rééducation',
    frames: [
      { r: [100, 62], t: -90, h: -90, a: [70, 75], a2: [110, 105], l: [74, 95], l2: [106, 85] },
      { r: [100, 62], t: -90, h: -90, a: [110, 105], a2: [70, 75], l: [106, 85], l2: [74, 95] }
    ]
  });
  D.exos.push({
    id: 'heel1', name: 'Montée sur la pointe d\'un seul pied (étape avancée)', group: 'Équilibre & cheville', icon: '👣',
    dose: { type: 'reps', sets: 3, reps: 8, perSide: true }, rest: 45,
    cap: ['Talon au sol', 'Sur la pointe'],
    steps: [
      'Debout face à un mur ou une chaise, mains en appui léger, en équilibre sur un seul pied.',
      'Montez lentement sur la pointe du pied en 2 secondes, tenez 1 seconde.',
      'Redescendez très lentement en 3 secondes. Faites tous les mouvements du même côté, puis changez.'
    ],
    tips: [RX, 'C\'est l\'exercice le plus exigeant pour le tendon : à n\'essayer que lorsque votre chirurgien ou kiné l\'a autorisé, après les montées à deux pieds.'],
    stop: 'Douleur au tendon d\'Achille (au-delà de 3/10), au mollet ou au genou.',
    easier: 'Montées sur la pointe à deux pieds (« Montées sur la pointe des pieds »), ou en poussant un peu avec l\'autre pied.',
    yt: 'montée sur pointe unipodale rééducation achille',
    frames: [
      { r: [100, 62], t: -90, h: -90, a: [50, 50], l: [90, 90], l2: [100, 170], props: POST.concat([[100, 122, 108, 122]]) },
      { r: [100, 54], t: -90, h: -90, a: [50, 50], l: [90, 90], l2: [100, 170], props: POST.concat([[100, 114, 108, 122]]) }
    ]
  });


  /* ===== Tendon d'Achille (4 ans après) et genoux ===== */
  D.groups.splice(D.groups.indexOf('Équilibre & cheville'), 0, 'Tendon & genoux');
  D.groups.splice(D.groups.indexOf('Cardio doux'), 0, 'Canicross');
  D.equipment.push({ id: 'marche', name: 'Marche d\'escalier ou step bas (10 à 15 cm)', short: 'marche', def: false });
  var TENDON = 'Charge progressive : la douleur au tendon ou au genou doit rester à 3/10 maximum et ne pas être plus forte le lendemain matin. Laissez 48 h entre deux séances qui chargent le tendon.';
  var SEAT = [[86, 94, 116, 94], [88, 94, 88, 122], [114, 94, 114, 122]];
  var STEP = [[70, 118, 112, 118], [70, 118, 70, 124], [112, 118, 112, 124]];
  D.exos.push({
    id: 'tke', name: 'Extension du genou allongé (serviette sous le genou)', group: 'Tendon & genoux', icon: '🦵',
    dose: { type: 'reps', sets: 3, reps: 10, perSide: true }, rest: 30,
    cap: ['Genou détendu', 'Genou écrasé sur la serviette'],
    steps: [
      'Allongé sur le dos, une serviette roulée sous le genou d\'une jambe, l\'autre jambe pliée, pied au sol.',
      'Poussez l\'arrière du genou sur la serviette en contractant la cuisse, jusqu\'à ce que la jambe soit bien tendue.',
      'Tenez 3 secondes, relâchez en 3 secondes. Faites tous les mouvements d\'un côté, puis de l\'autre.'
    ],
    tips: ['Renforce le quadriceps, qui protège le genou, sans aucune flexion ni charge.', TENDON],
    stop: 'Douleur vive dans le genou, ou fourmillements dans la jambe.',
    easier: 'Contractez la cuisse 5 secondes sans chercher à tendre complètement.',
    yt: 'extension terminale du genou serviette quadriceps ménisque',
    frames: [
      { r: [90, 122], t: 180, h: 180, a: [-15, -15], l: [-10, 6], l2: [-55, 60], props: [[114, 118, 126, 118], [114, 121, 126, 121]] },
      { r: [90, 122], t: 180, h: 180, a: [-15, -15], l: [0, 0], l2: [-55, 60], props: [[114, 118, 126, 118], [114, 121, 126, 121]] }
    ]
  });
  D.exos.push({
    id: 'shortarc', name: 'Extension de jambe assis (derniers degrés)', group: 'Tendon & genoux', icon: '🪑',
    dose: { type: 'reps', sets: 3, reps: 12, perSide: true }, rest: 45,
    cap: ['Genou plié', 'Jambe tendue'],
    steps: [
      'Assis bien droit sur une chaise stable, dos soutenu.',
      'Depuis le genou à demi plié, tendez lentement la jambe jusqu\'à l\'horizontale, tenez 2 secondes.',
      'Redescendez en 3 secondes, sans poser le pied. Faites tous les mouvements d\'un côté, puis de l\'autre.'
    ],
    tips: ['Travaille le quadriceps sur la zone où le genou est le moins sollicité.', TENDON],
    stop: 'Douleur dans le genou, craquement douloureux ou blocage.',
    easier: 'Amplitude plus petite, ou sans tenir la position.',
    yt: 'extension de jambe assis quadriceps genou renforcement',
    frames: [
      { r: [100, 92], t: -90, h: -90, a: [80, 90], l: [0, 45], props: SEAT },
      { r: [100, 92], t: -90, h: -90, a: [80, 90], l: [0, 0], props: SEAT }
    ]
  });
  D.exos.push({
    id: 'wallsit', name: 'Chaise au mur (genoux peu fléchis)', group: 'Tendon & genoux', icon: '🧱',
    dose: { type: 'time', sets: 3, secs: 20 }, rest: 45,
    cap: ['Dos au mur', 'Un peu plus bas'],
    steps: [
      'Dos et fessiers contre un mur, pieds à environ 40 cm du mur, largeur du bassin.',
      'Glissez doucement vers le bas en fléchissant les genoux de 30 à 40° seulement, comme si vous étiez à moitié assis.',
      'Tenez le temps indiqué en respirant, puis remontez en poussant sur les talons.'
    ],
    tips: ['Position statique : elle renforce les cuisses sans bouger le genou. Ne descendez jamais jusqu\'à 90°.', TENDON],
    stop: 'Douleur dans le genou ou dans le bas du dos, ou dans la jambe.',
    easier: 'Descendez moins bas, ou tenez 10 secondes.',
    yt: 'chaise au mur isométrique quadriceps genou peu fléchi',
    frames: [
      { r: [82, 66], t: -90, h: -90, a: [60, 50], l: [70, 100], props: [[74, 6, 74, 122]] },
      { r: [82, 68], t: -90, h: -90, a: [60, 50], l: [62, 100], props: [[74, 6, 74, 122]] }
    ]
  });
  D.exos.push({
    id: 'stepup', name: 'Montée sur une marche basse', group: 'Tendon & genoux', icon: '🪜',
    dose: { type: 'reps', sets: 3, reps: 8, perSide: true }, rest: 45,
    cap: ['Pied sur la marche', 'Debout sur la marche'],
    steps: [
      'Face à une marche basse (10 à 15 cm), une main près d\'un appui.',
      'Posez le pied entier sur la marche, poussez sur ce pied pour monter, sans vous aider de l\'autre jambe.',
      'Redescendez lentement en contrôlant (3 secondes). Faites tous les mouvements d\'un côté, puis de l\'autre.'
    ],
    tips: ['Genou aligné au-dessus du pied, jamais rentré vers l\'intérieur.', TENDON],
    stop: 'Douleur au genou, au tendon d\'Achille ou dans la jambe.',
    easier: 'Marche plus basse, ou appui plus fort de la main.',
    yt: 'montée de marche step up genou renforcement doux',
    frames: [
      { r: [100, 62], t: -90, h: -90, a: [60, 60], l: [50, 105], l2: [92, 92], props: [[104, 114, 140, 114], [104, 114, 104, 124], [140, 114, 140, 124]] },
      { r: [118, 54], t: -90, h: -90, a: [60, 60], l: [90, 90], l2: [92, 92], props: [[104, 114, 140, 114], [104, 114, 104, 124], [140, 114, 140, 124]] }
    ]
  });
  D.exos.push({
    id: 'soleus', name: 'Montées sur les pointes assis (mollet profond)', group: 'Tendon & genoux', icon: '🦶',
    dose: { type: 'reps', sets: 3, reps: 12 }, rest: 45,
    cap: ['Talons au sol', 'Talons levés'],
    steps: [
      'Assis sur une chaise, pieds à plat sous les genoux. Posez un sac à dos chargé (ou des bouteilles) sur les cuisses, près des genoux.',
      'Levez les deux talons le plus haut possible en 2 secondes, tenez 1 seconde.',
      'Redescendez lentement en 3 secondes.'
    ],
    tips: ['Genou plié : c\'est le muscle soléaire qui travaille, le grand allié du tendon d\'Achille.', TENDON],
    stop: 'Douleur au tendon d\'Achille (au-delà de 3/10) ou crampe forte.',
    easier: 'Sans charge sur les cuisses.',
    yt: 'mollet assis soléaire renforcement tendon d\'achille',
    frames: [
      { r: [100, 92], t: -90, h: -90, a: [30, 70], l: [0, 90], props: SEAT.concat([[124, 82, 138, 82], [124, 82, 124, 92]]) },
      { r: [100, 92], t: -90, h: -90, a: [30, 70], l: [-8, 90], props: SEAT.concat([[124, 78, 138, 78], [124, 78, 124, 88]]) }
    ]
  });
  D.exos.push({
    id: 'calfslow', name: 'Montées lentes chargées (3 s en haut, 3 s en bas)', group: 'Tendon & genoux', icon: '🎒',
    dose: { type: 'reps', sets: 3, reps: 10 }, rest: 60,
    cap: ['Pieds à plat', 'Sur la pointe'],
    steps: [
      'Debout, un sac à dos chargé sur le dos (ou une bouteille dans chaque main), mains près d\'un appui.',
      'Montez sur la pointe des pieds en 3 secondes, tenez 1 seconde en haut.',
      'Redescendez très lentement en 3 secondes. Augmentez la charge petit à petit, quand les 3 séries sont faciles.'
    ],
    tips: ['La lenteur et la charge sont ce qui rend le tendon plus solide, plus que le nombre de répétitions.', TENDON],
    stop: 'Douleur au tendon d\'Achille (au-delà de 3/10), au mollet ou au genou.',
    easier: 'Sans charge, ou « Montées sur la pointe des pieds » classiques.',
    yt: 'montées de mollets lentes chargées tendon d\'achille',
    frames: [
      { r: [100, 62], t: -90, h: -90, a: [50, 50], l: [90, 90], props: [[126, 46, 126, 122], [118, 46, 134, 46], [100, 122, 108, 122], [95, 30, 95, 48], [95, 30, 89, 30], [89, 30, 89, 48]] },
      { r: [100, 54], t: -90, h: -90, a: [50, 50], l: [90, 90], props: [[126, 46, 126, 122], [118, 46, 134, 46], [100, 114, 108, 122], [95, 22, 95, 40], [95, 22, 89, 22], [89, 22, 89, 40]] }
    ]
  });
  D.exos.push({
    id: 'heeldrop', name: 'Descente lente sur un pied (talon qui descend)', group: 'Tendon & genoux', icon: '⬇️',
    dose: { type: 'reps', sets: 3, reps: 10, perSide: true }, rest: 60,
    cap: ['Sur la pointe', 'Talon sous la marche'],
    steps: [
      'Debout sur le bord d\'une marche, pointes des pieds sur la marche, talons dans le vide, une main sur la rampe.',
      'Montez sur la pointe des deux pieds. Reportez tout le poids sur une seule jambe, genou tendu.',
      'Descendez le talon très lentement (3 secondes) sous le niveau de la marche, puis remontez avec les deux pieds. Faites toutes les répétitions d\'un côté, puis de l\'autre.'
    ],
    tips: ['Exercice de référence pour renforcer le tendon d\'Achille : la descente lente est la partie qui compte.', TENDON],
    stop: 'Douleur au tendon d\'Achille (au-delà de 3/10), au mollet ou au genou.',
    easier: 'Descente à deux pieds, ou sur sol plat sans descendre sous le niveau du sol.',
    yt: 'descente excentrique talon marche tendon d\'achille',
    frames: [
      { r: [100, 54], t: -90, h: -90, a: [50, 50], l: [90, 90], l2: [100, 170], props: STEP.concat([[126, 34, 126, 124], [118, 34, 134, 34]]) },
      { r: [100, 64], t: -90, h: -90, a: [50, 50], l: [90, 90], l2: [100, 170], props: STEP.concat([[126, 34, 126, 124], [118, 34, 134, 34]]) }
    ]
  });

  /* ===== Canicross : marche rapide puis trot avec le chien ===== */
  var DOG = [[142, 102, 168, 102], [168, 102, 175, 96], [145, 102, 145, 120], [165, 102, 165, 120], [142, 102, 136, 96], [106, 62, 142, 100]];
  var DOG2 = [[146, 98, 172, 98], [172, 98, 179, 92], [149, 98, 143, 116], [169, 98, 175, 112], [146, 98, 140, 92], [106, 62, 146, 96]];
  D.exos.push({
    id: 'canicalm', name: 'Marche tranquille avec le chien (échauffement)', group: 'Canicross', icon: '🐕',
    dose: { type: 'time', sets: 1, secs: 300 }, rest: 0,
    cap: ['Le chien renifle', 'On avance'],
    steps: [
      'Chien en harnais, relié par la longe élastique. Marchez d\'un pas souple, sans tirer.',
      'Laissez votre beagle renifler et faire ses besoins : c\'est son échauffement aussi.',
      'Réveillez doucement la cheville et le genou : pas de plus en plus actif sur la fin.'
    ],
    tips: ['Gardez la ligne détendue. Pas de traction sur le collier : seulement le harnais.'],
    stop: 'Douleur au genou, au tendon d\'Achille ou dans la jambe.',
    easier: 'Plus court, ou plus lentement.',
    yt: 'balade active avec son chien échauffement canicross',
    frames: [
      { r: [100, 62], t: -90, h: -90, a: [70, 75], a2: [110, 105], l: [74, 95], l2: [106, 85], props: DOG },
      { r: [100, 62], t: -90, h: -90, a: [110, 105], a2: [70, 75], l: [106, 85], l2: [74, 95], props: DOG }
    ]
  });
  D.exos.push({
    id: 'canifast', name: 'Marche rapide avec le chien', group: 'Canicross', icon: '🐕',
    dose: { type: 'time', sets: 4, secs: 180, rest: 120, restTxt: 'Marche tranquille avec le chien' }, rest: 120,
    cap: ['Pas rapide', 'Pas rapide'],
    steps: [
      'Marchez vite, bras actifs, en laissant la longe élastique légèrement tendue : le chien tire un peu, vous suivez.',
      'Le chien reste devant vous ou à votre côté ; dites « doucement » s\'il tire trop fort.',
      'Vous devez pouvoir parler par phrases courtes. Quand le chrono sonne, ralentissez et marchez tranquillement.'
    ],
    tips: ['Phase sans impact : elle prépare le chien, le cœur et vos articulations à la suite.', 'Terrain souple si possible (chemin, herbe), pas de bitume dur.'],
    stop: 'Douleur au genou (au-delà de 3/10), au tendon ou dans la jambe ; chien qui boite, halète fort ou refuse d\'avancer.',
    easier: 'Intervalles plus courts, ou allure plus lente.',
    yt: 'cani-marche marche rapide avec son chien débutant',
    frames: [
      { r: [100, 62], t: -86, h: -86, a: [60, 120], a2: [120, 60], l: [70, 95], l2: [110, 85], props: DOG },
      { r: [100, 62], t: -86, h: -86, a: [120, 60], a2: [60, 120], l: [110, 85], l2: [70, 95], props: DOG2 }
    ]
  });
  D.exos.push({
    id: 'canitrot', name: 'Trot très doux avec le chien', group: 'Canicross', icon: '🐕‍🦺',
    dose: { type: 'time', sets: 6, secs: 60, rest: 120, restTxt: 'Marche tranquille avec le chien' }, rest: 120,
    cap: ['Foulée courte', 'Foulée courte'],
    steps: [
      'Trottinez à petits pas, très doux, sur terrain souple, le chien devant vous, longe légèrement tendue.',
      'Foulée courte, genoux peu levés, buste droit. Vous devez pouvoir parler.',
      'Quand le chrono sonne, passez immédiatement à la marche tranquille.'
    ],
    tips: ['Réservé aux semaines 5 à 12, avec l\'accord de votre médecin ou kiné : c\'est de la course (impact).', 'Pas de demi-tour brusque : le chien ne doit pas vous faire pivoter.'],
    stop: 'Douleur au genou, au tendon d\'Achille ou dans le dos/la jambe (au-delà de 3/10) ; chien qui boite ou halète fort.',
    easier: 'Revenez à la marche rapide (semaines 1 à 4).',
    yt: 'trot canicross débutant foulée douce',
    frames: [
      { r: [100, 62], t: -82, h: -82, a: [110, 170], a2: [30, 80], l: [50, 100], l2: [120, 70], props: DOG2 },
      { r: [100, 62], t: -82, h: -82, a: [30, 80], a2: [110, 170], l: [120, 70], l2: [50, 100], props: DOG }
    ]
  });
  D.exos.push({
    id: 'canicool', name: 'Retour au calme avec le chien', group: 'Canicross', icon: '🐕',
    dose: { type: 'time', sets: 1, secs: 300 }, rest: 0,
    cap: ['Marche lente', 'Marche lente'],
    steps: [
      'Marchez lentement jusqu\'à ce que votre respiration et celle du chien soient redevenues calmes.',
      'Proposez de l\'eau fraîche au chien, et buvez aussi.',
      'Retirez le harnais seulement quand il est calme.'
    ],
    tips: ['Ne laissez pas le chien se coucher immédiatement sans avoir marché : on récupère en douceur.'],
    stop: 'Chien qui boite ou halète longtemps : voyez votre vétérinaire.',
    easier: 'Marchez plus lentement.',
    yt: 'retour au calme après le sport avec son chien',
    frames: [
      { r: [100, 62], t: -90, h: -90, a: [80, 95], a2: [100, 85], l: [78, 93], l2: [102, 87], props: DOG },
      { r: [100, 62], t: -90, h: -90, a: [100, 85], a2: [80, 95], l: [102, 87], l2: [78, 93], props: DOG }
    ]
  });


  /* ===== Au travail : discret, silencieux, assis ou debout ===== */
  D.groups.splice(D.groups.indexOf('Tendon & genoux'), 0, 'Au travail');
  var DESKTIP = 'Discret et silencieux : personne ne le remarque. Gardez le souffle naturel.';
  var DESK = [[118, 70, 172, 70], [164, 70, 164, 122]];
  D.exos.push({
    id: 'deskpelvic', name: 'Bascule du bassin assis', group: 'Au travail', icon: '🪑',
    dose: { type: 'reps', sets: 2, reps: 12, rest: 10 }, rest: 10,
    cap: ['Dos creusé', 'Dos arrondi'],
    steps: [
      'Assis sur le bord de la chaise, pieds à plat, mains sur les cuisses.',
      'Basculez doucement le bassin vers l\'avant (dos légèrement creusé), puis vers l\'arrière (dos légèrement arrondi).',
      'Petits mouvements lents, sans forcer. Le haut du corps reste calme.'
    ],
    tips: [DESKTIP, 'Réveille le bas du dos et soulage la position assise prolongée.'],
    stop: 'Douleur dans le bas du dos ou qui descend dans la jambe.',
    easier: 'Mouvements encore plus petits.',
    yt: 'bascule du bassin assis mal de dos bureau',
    frames: [
      { r: [100, 92], t: -84, h: -84, a: [30, 60], l: [0, 90], props: SEAT },
      { r: [100, 92], t: -97, h: -97, a: [30, 60], l: [0, 90], props: SEAT }
    ]
  });
  D.exos.push({
    id: 'deskbrace', name: 'Gainage du ventre assis (nombril vers la colonne)', group: 'Au travail', icon: '🎯',
    dose: { type: 'time', sets: 3, secs: 15, rest: 10 }, rest: 10,
    cap: ['Se redresser', 'Ventre rentré'],
    steps: [
      'Assis grand, dos droit sans s\'appuyer, pieds à plat.',
      'Rentrez doucement le ventre, comme pour éloigner le nombril de la ceinture, sans bloquer la respiration.',
      'Tenez le temps indiqué en respirant normalement, puis relâchez.'
    ],
    tips: [DESKTIP, 'Travaille le muscle profond de la sangle abdominale, celui qui soutient le dos.'],
    stop: 'Douleur dans le dos ou le bas-ventre.',
    easier: '8 secondes, en contractant moins fort.',
    yt: 'transverse abdominal contraction assis bureau',
    frames: [
      { r: [100, 92], t: -97, h: -85, a: [30, 60], l: [0, 90], props: SEAT },
      { r: [100, 92], t: -90, h: -90, a: [30, 60], l: [0, 90], props: SEAT }
    ]
  });
  D.exos.push({
    id: 'deskretract', name: 'Omoplates qui se rapprochent', group: 'Au travail', icon: '🦅',
    dose: { type: 'reps', sets: 3, reps: 12, rest: 10 }, rest: 10,
    cap: ['Bras devant', 'Coudes en arrière'],
    steps: [
      'Assis ou debout, bras devant vous, épaules basses.',
      'Ramenez les coudes en arrière en serrant les omoplates l\'une contre l\'autre, comme pour les glisser dans les poches arrière.',
      'Tenez 2 secondes, puis revenez lentement. Ne cambrez pas le dos.'
    ],
    tips: [DESKTIP, 'Renforce le haut du dos et corrige la position penchée sur l\'écran.'],
    stop: 'Douleur vive à l\'épaule ou dans le cou.',
    easier: 'Mouvement plus petit.',
    yt: 'rétraction des omoplates assis exercice bureau',
    frames: [
      { r: [100, 92], t: -90, h: -90, a: [10, 10], l: [0, 90], props: SEAT },
      { r: [100, 92], t: -90, h: -90, a: [105, -10], l: [0, 90], props: SEAT }
    ]
  });
  D.exos.push({
    id: 'deskchin', name: 'Menton rentré (nuque et haut du dos)', group: 'Au travail', icon: '🙂',
    dose: { type: 'reps', sets: 2, reps: 10, rest: 10 }, rest: 10,
    cap: ['Tête en avant', 'Menton rentré'],
    steps: [
      'Assis ou debout, regard horizontal.',
      'Reculez la tête en rentrant légèrement le menton, comme pour faire un double menton, sans baisser les yeux.',
      'Tenez 3 secondes, puis relâchez doucement.'
    ],
    tips: [DESKTIP, 'À refaire dès que vous sentez la tête partir en avant vers l\'écran.'],
    stop: 'Étourdissement, douleur dans la nuque ou fourmillements dans le bras.',
    easier: 'Tenez 1 seconde seulement.',
    yt: 'menton rentré rétraction cervicale bureau',
    frames: [
      { r: [100, 92], t: -90, h: -62, a: [30, 60], l: [0, 90], props: SEAT },
      { r: [100, 92], t: -90, h: -90, a: [30, 60], l: [0, 90], props: SEAT }
    ]
  });
  D.exos.push({
    id: 'deskglute', name: 'Contraction des fessiers assis', group: 'Au travail', icon: '🍑',
    dose: { type: 'reps', sets: 3, reps: 10, rest: 10 }, rest: 10,
    cap: ['Relâché', 'Fessiers serrés'],
    steps: [
      'Assis droit, pieds à plat, mains sur les cuisses.',
      'Serrez les fessiers comme pour vous soulever légèrement de la chaise, sans bouger les jambes.',
      'Tenez 5 secondes, relâchez, respirez normalement.'
    ],
    tips: [DESKTIP, 'Les fessiers forts soulagent le bas du dos et le nerf sciatique.'],
    stop: 'Crampe ou douleur dans la jambe.',
    easier: 'Tenez 3 secondes.',
    yt: 'contraction des fessiers assis isométrique bureau',
    frames: [
      { r: [100, 92], t: -90, h: -90, a: [30, 60], l: [0, 90], props: SEAT },
      { r: [100, 90], t: -90, h: -90, a: [30, 60], l: [0, 90], props: SEAT }
    ]
  });
  D.exos.push({
    id: 'deskknee', name: 'Marche des genoux assis', group: 'Au travail', icon: '🦵',
    dose: { type: 'reps', sets: 3, reps: 10, perSide: true, rest: 10 }, rest: 10,
    cap: ['Pied au sol', 'Genou levé'],
    steps: [
      'Assis droit au bord de la chaise, mains sur les côtés du siège, dos bien droit.',
      'Soulevez un pied de quelques centimètres en gardant le bassin immobile et le ventre rentré.',
      'Reposez-le doucement et changez de côté. Tous les mouvements d\'un côté, puis de l\'autre.'
    ],
    tips: [DESKTIP, 'Le bassin ne doit pas bouger : c\'est ce qui fait travailler les abdominaux profonds.'],
    stop: 'Douleur dans le bas du dos ou le pli de l\'aine.',
    easier: 'Levez seulement le talon.',
    yt: 'levée de genou assis abdominaux bureau',
    frames: [
      { r: [100, 92], t: -90, h: -90, a: [60, 80], l: [0, 90], props: SEAT },
      { r: [100, 92], t: -90, h: -90, a: [60, 80], l: [-25, 65], l2: [0, 90], props: SEAT }
    ]
  });
  D.exos.push({
    id: 'deskpalms', name: 'Pression des mains sous le bureau', group: 'Au travail', icon: '🖐️',
    dose: { type: 'time', sets: 3, secs: 10, rest: 10 }, rest: 10,
    cap: ['Mains sous le bureau', 'On pousse vers le haut'],
    steps: [
      'Assis droit, glissez les paumes sous le plateau du bureau, coudes pliés.',
      'Poussez les paumes vers le haut, sans bouger le bureau, et rentrez le ventre.',
      'Tenez 10 secondes en respirant, puis relâchez.'
    ],
    tips: [DESKTIP, 'Fait travailler épaules, haut du dos et ventre en même temps.'],
    stop: 'Douleur à l\'épaule ou dans le cou.',
    easier: 'Poussez moins fort, 5 secondes.',
    yt: 'isométrique mains sous le bureau exercice discret',
    frames: [
      { r: [100, 92], t: -90, h: -90, a: [60, 50], l: [0, 90], props: SEAT.concat(DESK) },
      { r: [100, 92], t: -90, h: -90, a: [60, 40], l: [0, 90], props: SEAT.concat(DESK) }
    ]
  });
  D.exos.push({
    id: 'deskrotate', name: 'Rotation douce du buste assis', group: 'Au travail', icon: '🔄',
    dose: { type: 'reps', sets: 2, reps: 8, perSide: true, rest: 10 }, rest: 10,
    cap: ['Tourne à gauche', 'Tourne à droite'],
    steps: [
      'Assis droit, pieds à plat et bien posés, bras croisés sur la poitrine.',
      'Tournez lentement le buste d\'un côté en regardant par-dessus l\'épaule, bassin immobile, petite amplitude.',
      'Revenez au centre. Tous les mouvements d\'un côté, puis de l\'autre.'
    ],
    tips: [DESKTIP, 'Mouvement doux de mobilité : ne forcez jamais en fin de course.'],
    stop: 'Douleur dans le dos ou qui descend dans la jambe.',
    easier: 'Amplitude plus petite.',
    yt: 'rotation du buste assis mobilité dos bureau',
    frames: [
      { r: [100, 92], t: -90, h: -90, a: [-10, -10], a2: [-10, -10], l: [0, 90], props: SEAT },
      { r: [100, 92], t: -90, h: -90, a: [40, 40], a2: [-40, -40], l: [0, 90], props: SEAT }
    ]
  });
  D.exos.push({
    id: 'deskangel', name: 'Ange contre le mur (debout)', group: 'Au travail', icon: '👼',
    dose: { type: 'reps', sets: 2, reps: 10, rest: 10 }, rest: 10,
    cap: ['Coudes pliés', 'Bras levés'],
    steps: [
      'Debout, dos contre un mur, pieds à 10 cm du mur, ventre rentré, bas du dos proche du mur.',
      'Coudes pliés à hauteur des épaules, dos des mains vers le mur : faites glisser les bras vers le haut le long du mur.',
      'Redescendez lentement. Gardez la tête et le dos en contact avec le mur autant que possible.'
    ],
    tips: [DESKTIP, 'À faire dans un couloir ou près d\'une cloison : ouvre la poitrine et renforce le haut du dos.'],
    stop: 'Douleur ou fourmillements dans les épaules ou les bras.',
    easier: 'Amplitude plus petite, ou sans que les bras touchent le mur.',
    yt: 'wall angel ange contre le mur exercice dos',
    frames: [
      { r: [82, 62], t: -90, h: -90, a: [100, -80], l: [90, 90], props: [[74, 6, 74, 122]] },
      { r: [82, 62], t: -90, h: -90, a: [-100, -100], l: [90, 90], props: [[74, 6, 74, 122]] }
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
  eq('ankcirc', 'chaise', 'Sans chaise : asseyez-vous au bord d\'un lit ou d\'un canapé, jambe tendue devant vous.');
  eq('bandankle', 'elastique', 'Sans élastique : mêmes mouvements du pied, lentement, en résistant avec votre main ou sans résistance.');
  eq('shift bipodal tandem monowall eyesclosed heel1', 'chaise table', SUPPORT);
  eq('tke', 'tapis', 'Sans tapis : allongez-vous sur une serviette épaisse, une couette pliée ou une moquette.');
  eq('shortarc soleus', 'chaise', 'Sans chaise : asseyez-vous au bord d\'un lit ou d\'un canapé assez haut.');
  eq('calfslow', 'bouteilles halteres', 'Sans charge : mêmes montées, mais encore plus lentement (4 secondes à la descente).');
  eq('heeldrop', 'marche', 'Sans marche : faites l\'exercice sur sol plat, en descendant très lentement (4 secondes) d\'une montée sur la pointe.');
  eq('stepup', 'marche', 'Sans marche : utilisez la première marche d\'un escalier ou un seuil solide ; à défaut, faites plutôt la chaise au mur.', 'wallsit');
  eq('foam', 'coussin', 'Sans coussin : restez sur le sol et regardez lentement de gauche à droite (ou fermez les yeux quelques secondes) pour rendre l\'exercice plus difficile.');

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
  D.sessions.push({
    id: 'achille1', name: 'Équilibre et cheville : niveau 1', tag: 'Rééducation Achille',
    desc: 'Mobilité de la cheville, transfert du poids et équilibre sur les deux pieds puis un pied avec appui. À commencer avec l\'accord de votre chirurgien ou kiné.',
    items: [
      { id: 'ankcirc', w: true, sets: 1, reps: 10 }, { id: 'bandankle' }, { id: 'shift' }, { id: 'bipodal' },
      { id: 'tandem' }, { id: 'monowall' }, { id: 'calf', sets: 2, reps: 10 }
    ]
  });
  D.sessions.push({
    id: 'achille2', name: 'Équilibre et cheville : niveau 2', tag: 'Rééducation Achille',
    desc: 'Équilibre sur un pied sans appui, yeux fermés, sur coussin, puis montées sur un pied. À commencer seulement quand le niveau 1 est facile et validé par votre kiné.',
    items: [
      { id: 'ankcirc', w: true, sets: 1, reps: 10 }, { id: 'monofree' }, { id: 'eyesclosed' }, { id: 'foam' },
      { id: 'heelwalk' }, { id: 'heel1' }, { id: 'bandankle', sets: 1 }
    ]
  });
  D.sessions.push({
    id: 'D', name: 'Séance D : tendon d\'Achille et genoux', tag: 'Renforcement',
    desc: 'Renforce le tendon d\'Achille (montées lentes, descentes sur une marche) et les cuisses, sans flexion profonde. 1 à 2 fois par semaine, jamais deux jours de suite.',
    items: [
      { id: 'marchplace', w: true }, { id: 'ankcirc', w: true, sets: 1, reps: 8 }, { id: 'tke' }, { id: 'shortarc' }, { id: 'wallsit' },
      { id: 'stepup' }, { id: 'soleus' }, { id: 'calfslow' }, { id: 'heeldrop' }
    ]
  });
  D.sessions.push({
    id: 'bureau1', name: 'Au travail : dos et ventre, 5 min', tag: 'Discret',
    desc: 'Assis à votre bureau, sans bruit ni matériel : réveille le dos, les fessiers et la sangle abdominale. Coupez le son dans Profil si besoin (le téléphone vibre).',
    items: [{ id: 'deskpelvic' }, { id: 'deskbrace' }, { id: 'deskretract' }, { id: 'deskchin', sets: 1 }, { id: 'deskglute', sets: 2 }]
  });
  D.sessions.push({
    id: 'bureau2', name: 'Au travail : gainage assis, 10 min', tag: 'Discret',
    desc: 'Plus complet : abdominaux profonds, dos et omoplates. Le dernier exercice se fait debout contre un mur (couloir, cloison).',
    items: [{ id: 'deskpelvic', sets: 1 }, { id: 'deskbrace' }, { id: 'deskknee' }, { id: 'deskpalms' }, { id: 'deskrotate' }, { id: 'deskretract' }, { id: 'deskglute' }, { id: 'deskangel' }]
  });
  S('C').items = [
    { id: 'shoulders', w: true }, { id: 'chestopen', w: true }, { id: 'walk', mins: 20 },
    { id: 'hamstring' }, { id: 'piriformis' }, { id: 'sphinx', sets: 2 }, { id: 'catcamel', sets: 1, reps: 8 }
  ];


  /* ===== Programme canicross : 12 semaines, 2 séances par semaine ===== */
  D.cani = { weeks: [] };
  [
    ['Cani-marche', 'canifast', 4, 180, 120, 'Marche rapide : 4 × 3 min, avec 2 min de marche tranquille entre chaque.'],
    ['Cani-marche', 'canifast', 5, 180, 120, 'Marche rapide : 5 × 3 min, avec 2 min de marche tranquille entre chaque.'],
    ['Cani-marche', 'canifast', 4, 300, 120, 'Marche rapide : 4 × 5 min, avec 2 min de marche tranquille entre chaque.'],
    ['Cani-marche', 'canifast', 4, 360, 120, 'Marche rapide : 4 × 6 min, avec 2 min de marche tranquille entre chaque.'],
    ['Trot très doux', 'canitrot', 6, 60, 120, 'Trot : 6 × 1 min, avec 2 min de marche entre chaque.'],
    ['Trot très doux', 'canitrot', 6, 90, 120, 'Trot : 6 × 1 min 30, avec 2 min de marche entre chaque.'],
    ['Trot très doux', 'canitrot', 6, 120, 120, 'Trot : 6 × 2 min, avec 2 min de marche entre chaque.'],
    ['Trot très doux', 'canitrot', 5, 180, 120, 'Trot : 5 × 3 min, avec 2 min de marche entre chaque.'],
    ['Canicross', 'canitrot', 4, 300, 120, 'Trot : 4 × 5 min, avec 2 min de marche entre chaque.'],
    ['Canicross', 'canitrot', 3, 420, 120, 'Trot : 3 × 7 min, avec 2 min de marche entre chaque.'],
    ['Canicross', 'canitrot', 3, 480, 120, 'Trot : 3 × 8 min, avec 2 min de marche entre chaque.'],
    ['Canicross', 'canitrot', 2, 720, 120, 'Trot : 2 × 12 min, avec 2 min de marche entre chaque.']
  ].forEach(function (w, i) {
    var n = i + 1;
    D.cani.weeks.push({ n: n, phase: w[0], text: w[5] });
    D.sessions.push({
      id: 'cani' + n, hidden: true, name: 'Canicross, semaine ' + n + ' : ' + w[0], tag: 'Semaine ' + n + '/12',
      desc: w[5] + ' Échauffement et retour au calme de 5 min chacun.',
      items: [{ id: 'canicalm', w: true }, { id: w[1], sets: w[2], secs: w[3], rest: w[4] }, { id: 'canicool' }]
    });
  });
  D.cani.help = {
    you: [
      'Les semaines 1 à 4 (marche rapide) n\'ont pas d\'impact. Le trot (semaines 5 à 12) est de la course : avec un ménisque fissuré, une sciatique et un tendon d\'Achille opéré, demandez l\'accord de votre médecin ou kiné avant la semaine 5.',
      'Douleur à 3/10 maximum au genou, au tendon et au dos, et pas plus forte le lendemain matin. Sinon, refaites la semaine précédente ou revenez à la marche.',
      'Terrain souple (chemin, forêt, herbe), pas de bitume dur, chaussures de running amorties.',
      'Ceinture de canicross large (baudrier) et longe élastique : la traction passe par le bassin, pas par le dos. Jamais la laisse enroulée autour de la main ou du poignet.',
      'Apprenez au chien « doucement » et « stop » en marchant. Pas de demi-tour brusque ni de pivot pied bloqué : prévenez-le avant de tourner.',
      'Complétez avec la séance D (tendon et genoux) et l\'équilibre, 1 à 2 fois par semaine, un jour sans canicross.'
    ],
    dog: [
      'Bilan chez le vétérinaire avant de commencer (cœur, respiration, poids, articulations, dos), surtout à 6 ans et en surpoids.',
      'Harnais de traction adapté à sa morphologie et longe élastique : un harnais de promenade ne convient pas, et jamais de traction sur le collier.',
      'Un chien en surpoids se mène avec encore plus de prudence : on n\'allonge qu\'une chose à la fois (durée ou allure), et on reste une semaine de plus si besoin.',
      'Perte de poids : ration ajustée avec le vétérinaire et pesée une fois par mois. La promenade seule ne suffit pas.',
      'Séance au moins 1 h après un repas. Eau à portée. Évitez les heures chaudes et, dès qu\'il fait chaud, raccourcissez ou reportez.',
      'Votre beagle suit son nez : laissez-le renifler pendant les marches tranquilles, et gardez-le en longe hors des zones de gibier.',
      'Arrêtez si le chien halète fort, boite, s\'arrête souvent ou refuse d\'avancer. Notez ses réactions après chaque séance.'
    ],
    src: 'Sources : Decathlon Conseil Sport (comment commencer le sport avec son chien), Emmène ton chien (débuter le canicross).'
  };

})();
