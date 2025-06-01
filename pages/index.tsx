import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { Player } from "../lib/types";

const players = [
  { name: "PEUGEOT 206", tag: "2003", imageUrl: "/images/amine.jpg", puuid: "TJmL173chpBotTiOrVu1JRCRcNJHh0TNDiaOhj0EA1uQ2ufYqT7Z_zr8NVLp-OJfaRIdAxMPlmdbiA" },
  { name: "MiriiCs", tag: "EUW", imageUrl: "/images/basic.jpg", puuid: "PCvvCyFkQ5U3f3hZMj3cqr3rb6wNylgeS-f8poWmIcNHAEigVXQW-xfy1SeprEQa0RnHSIORcgC6UA" },
  { name: "Blacknalla", tag: "EUW", imageUrl: "/images/basic.jpg", puuid: "MMPZESC6CI6hKK15mj8IMgOBv-Y8gxgsAcgbLK1tTKqMtIX383YktT0Z_Zt6c67rKFryufFfhBJ_Wg" },
  { name: "Reze", tag: "SLN", imageUrl: "/images/selene.jpg", puuid: "tOydTHOy3oDxZoWpGrc21lR1kWx_8FJg8eMUG71qzwiHEqhYaviXqHL8elbDs4c4CkJ_i8gt7lB3oQ" },
  { name: "matajare21", tag: "9781", imageUrl: "/images/basic.jpg", puuid: "yuGtS-JtDWN1Lbb5suNGq0RqhYVyKqTq6ToahHaK9P9ZNFUSGbXluOFe2YK5p2aLM0EOdl-xi_8A2w" },
  { name: "NONTRENO", tag: "973", imageUrl: "/images/carlitos.jpg", puuid: "Pw5BhSWqcoQfGcncqwesANUAQ6cUjmcJm2luPkzV4qrOyxGJdc53gO9INvWCe7huoPYHRvEhgF-MhQ" },
  { name: "Ayiyiyiyi", tag: "Yiyi", imageUrl: "/images/basic.jpg", puuid: "P-r6kstcy7A8klZJToW-FPWkOBZYi_y2sFh2N6TCWl-wwJhkWGG2bYZslAEnYuozXrmDoD-cr9_Cjw" },
  { name: "Sidus92", tag: "EUW", imageUrl: "/images/basic.jpg", puuid: "thZptNo44CUs9grCmSph8pDoo9pDvTiwAzP4eNPdgCAu1RDAqE5kM2Lx6QZIKYY1o4kLk2eMG5SsDg" },
  { name: "FoIIamosGordas", tag: "EUW", imageUrl: "/images/chicho.jpg", puuid: "N2kthO1rH16J69G-ClsQ5gCzOrXuf5qOI2BV9s1OMdYGCpQo_Isem2M5Z9wO3Zuhn1jI4_yEpJcgow" },
  { name: "Hypnopompic Man", tag: "EUW", imageUrl: "/images/chami.jpg", puuid: "J7as3B4pKDqCUIP6v5AW1ldOHT6gCAi6d8ZY-5BILRNtbaaRlI1N2qpLV0tmWWjZ5ey0SQUHMpaUvg" },
  { name: "Harvey El Pestes", tag: "SPE", imageUrl: "/images/extintor.jpg", puuid: "wZVyvXgTguOS5peX4xe77PCKV-gjyLhVaJdIWtpLWlFh_V02pZT31AIFTIYrlAS4zXhRgYx0JDpsEQ" },
  { name: "xBurgo", tag: "BURGO", imageUrl: "/images/biengo.jpg", puuid: "FjeqSaJg67iSj26zTXodOGvFScAgLKIbWbU0tCuRcUx8mu8CL9vUlXzA7IrjPaFRUJOoah6gc2lM6g" },
  { name: "Gol D Loren", tag: "2330", imageUrl: "/images/loren.jpg", puuid: "LFZP3slT2YvTDiajQwgypKPLpW5QmBRQTRJspUZFueyr6Fj6-pjcGdRutFLp2M0Wms_7p-8atfVx9Q" },
  { name: "danielgv1498", tag: "Poppy", imageUrl: "/images/dani.jpg", puuid: "WtxXNfwng7pLRgknROPL0i9IFr42gKctk841co3u8rRjLjLcAqoT-kmk-WJ5FD3N4KJqOwCZBKqocA" },
  { name: "BurgoLover", tag: "3642", imageUrl: "/images/huevito.jpg", puuid: "SGCLMlM9X3eQlonh2hhFxZkP9OK2jz9q8-0hBGkcU95w00Onr17-Gui0UW2vkyw7xXFlUy82T20z7A" },
  { name: "SoloQoala", tag: "Uzhas", imageUrl: "/images/alferez.jpg", puuid: "6NHAWyeiuihxUl_9NPVIwn1oHJT3cm4yu51DIR_hAOdDfFWOIJM6L4WnkSekqeVnj0zptV1TKGgNEw" },
  { name: "50 swags of bard", tag: "EUW", imageUrl: "/images/aleano.jpg", puuid: "5RnWvwJQ2EuruySVVO3vvwyUmOdZq_KPLudZ8koAbM1V9rG7-ayCLPvBF12YZVEMkHgg2xLbL3Ba1g" },
];


const ligaOrden = [
  "DIAMOND",
  "EMERALD",
  "PLATINUM",
  "GOLD",
  "SILVER",
  "BRONZE",
  "IRON",
  "UNRANKED",
];
const divisionOrden = ["I", "II", "III", "IV"];
const emojiOrder = ["🔥", "😅", "🙂", "🥶", "🧊"];


function compararRank(a: Player, b: Player) {
  if (!a.rank) return 1;
  if (!b.rank) return -1;

  const [rankA, lpPartA] = a.rank.split(" - ");
  const [rankB, lpPartB] = b.rank.split(" - ");
  const [ligaA, divisionA] = rankA.split(" ");
  const [ligaB, divisionB] = rankB.split(" ");

  const ligaAIndex = ligaOrden.indexOf(ligaA.toUpperCase());
  const ligaBIndex = ligaOrden.indexOf(ligaB.toUpperCase());

  if (ligaAIndex < ligaBIndex) return -1;
  if (ligaAIndex > ligaBIndex) return 1;

  const divisionAIndex = divisionOrden.indexOf(divisionA?.toUpperCase());
  const divisionBIndex = divisionOrden.indexOf(divisionB?.toUpperCase());

  if (divisionAIndex < divisionBIndex) return -1;
  if (divisionAIndex > divisionBIndex) return 1;

  const lpA = parseInt(lpPartA?.replace(" LP", "").trim() || "0");
  const lpB = parseInt(lpPartB?.replace(" LP", "").trim() || "0");

  if (lpA > lpB) return -1;
  if (lpA < lpB) return 1;

  return 0;
}

const REFRESH_TIME = 2.5 * 60 * 1000;

const fetchRank = async (puuid: string) => {
  const res = await fetch(
    `/api/rank?puuid=${encodeURIComponent(puuid)}`
  );
  const data = await res.json();
  return data;
};

export default function Home() {
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [lastUpdate, setLastUpdate] = useState<number | null>(null);
  const [timeSince, setTimeSince] = useState("Desconocido");
  const [maxPartidas, setMaxPartidas] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
  setLoading(true); // mostrar throbber

  const results: Player[] = [];

  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    const data = await fetchRank(player.puuid);

    results.push({
      ...player,
      rank: `${data.tier} ${data.rank} - ${data.lp} LP`,
      wins: data.wins,
      losses: data.losses,
      estado: data.estado,
    });

    // Espera 1 segundo después de cada 5 solicitudes
    if ((i + 1) % 5 === 0 && i !== players.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  results.sort(compararRank);
  const max = Math.max(...results.map(p => (p.wins ?? 0) + (p.losses ?? 0)));
  setMaxPartidas(max);

  const now = Date.now();
  localStorage.setItem("lastUpdate", now.toString());
  setLastUpdate(now);
  setPlayerData(results);
  setLoading(false); // ocultar throbber
};


  const getTimeSince = (timestamp: number) => {
      const diff = Date.now() - timestamp;
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      if (diff < 0) return "Desconocido";
      if (minutes === 0 && seconds === 0) return "Justo ahora";
      if (minutes === 0) return `${seconds} seg.`;
      return `${minutes} min ${seconds} seg.`;
    };

  useEffect(() => {
    const stored = localStorage.getItem("lastUpdate");
    if (stored) {
      const ts = parseInt(stored);
      setLastUpdate(ts);
      setTimeSince(getTimeSince(ts));
    }
    const interval = setInterval(() => {
      if (lastUpdate) setTimeSince(getTimeSince(lastUpdate));
    }, 1000);
    return () => clearInterval(interval);
  }, [lastUpdate]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const canRefresh = !lastUpdate || Date.now() - lastUpdate > REFRESH_TIME;

  const [sortBy, setSortBy] = useState<"pos" | "name" | "rank" | "partidas" | "wr" | "actividad" | "estado">("pos");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const getActividadLevel = (wins?: number, losses?: number, maxPartidas?: number): string => {
    const total = (wins ?? 0) + (losses ?? 0);

    if (!maxPartidas || maxPartidas === 0) return "🧊";

    const porcentaje = (total / maxPartidas) * 100;

    if (porcentaje >= 90) return "🔥";
    if (porcentaje >= 70) return "😅";
    if (porcentaje >= 50) return "🙂";
    if (porcentaje >= 30) return "🥶";
    return "🧊";
  };

  const getSortedData = () => {
    const sorted = [...playerData];
    if (sortBy === "name") {
      sorted.sort((a, b) =>
        sortDir === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    } else if (sortBy === "rank") {
      sorted.sort((a, b) =>
        sortDir === "asc" ? compararRank(b, a) : compararRank(a, b)
      );
    } else if (sortBy === "partidas") {
      sorted.sort((a, b) => {
        const totalA = (a.wins ?? 0) + (a.losses ?? 0);
        const totalB = (b.wins ?? 0) + (b.losses ?? 0);
        return sortDir === "asc" ? totalA - totalB : totalB - totalA;
      });
    } else if (sortBy === "wr") {
      sorted.sort((a, b) => {
        const wrA = (a.wins ?? 0) / ((a.wins ?? 0) + (a.losses ?? 0)) || 0;
        const wrB = (b.wins ?? 0) / ((b.wins ?? 0) + (b.losses ?? 0)) || 0;
        return sortDir === "asc" ? wrA - wrB : wrB - wrA;
      });
    } else if (sortBy === "actividad") {
      sorted.sort((a, b) => {
      const emojiA = getActividadLevel(a.wins, a.losses, maxPartidas);
      const emojiB = getActividadLevel(b.wins, b.losses, maxPartidas);
      const indexA = emojiOrder.indexOf(emojiA);
      const indexB = emojiOrder.indexOf(emojiB);
      return sortDir === "asc" ? indexA - indexB : indexB - indexA;
    });
    
    } else if (sortBy === "estado") {
      sorted.sort((a, b) => {
        const estadoA = a.estado ? 0 : 1; 
        const estadoB = b.estado ? 0 : 1;
        return sortDir === "asc" ? estadoA - estadoB : estadoB - estadoA;
      });
    }



    return sorted;
  };

  const handleSort = (col: "pos" | "name" | "rank" | "partidas" | "wr" | "actividad" | "estado") => {
    if (sortBy === col) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortDir(col === "pos" ? "asc" : "desc");
    }
  };

  const abrirOpGG = (link: string) => {
    const url = `https://op.gg/es/lol/summoners/euw/${link}`;
    window.open(url, '_blank');
  };
  
  const getActividadEmoji = (wins?: number, losses?: number) => {
    const total = (wins ?? 0) + (losses ?? 0);

    // Si maxPartidas es 0 o no está listo, muestra emoji base
    if (!maxPartidas || maxPartidas === 0) {
      return (
        <span
          style={{
            fontSize: "1.5rem",
            color: "#1e90ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
          title={total === 0 ? "Sin partidas registradas" : "Datos cargando..."}
        >
          🧊
        </span>
      );
    }

    const porcentaje = (total / maxPartidas) * 100;

    let emoji = "🧊";
    let color = "#1e90ff";

    if (porcentaje >= 90) {
      emoji = "🔥";
      color = "#ff4500";
    } else if (porcentaje >= 70) {
      emoji = "😅";
      color = "#ff8c00";
    } else if (porcentaje >= 50) {
      emoji = "🙂";
      color = "#daa520";
    } else if (porcentaje >= 30) {
      emoji = "🥶";
      color = "#4682b4";
    }

    return (
      <span
        style={{
          fontSize: "1.5rem",
          color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
        title={
          total === 0
            ? "Sin partidas registradas"
            : `Actividad relativa: ${porcentaje.toFixed(0)}% (Total: ${total} partidas)`
        }
      >
        {emoji}
      </span>
    );
  };

  // const formatDateTime = (timestamp: number) => {
  //   const d = new Date(timestamp);
  //   const day = d.getDate();
    
  //   // Nombres de meses en español
  //   const months = [
  //     "enero", "febrero", "marzo", "abril", "mayo", "junio",
  //     "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  //   ];
  //   const monthName = months[d.getMonth()];
    
  //   const year = d.getFullYear();
  //   const hours = d.getHours().toString().padStart(2, "0");
  //   const minutes = d.getMinutes().toString().padStart(2, "0");

  //   return `${day} de ${monthName} de ${year} a las ${hours}:${minutes}`;
  // };


  return (
    <main className={styles.main} style={{ margin: 0 }}>  


      <body style={{ margin: 0 }}>
      <h1 className={styles.title}>SOLOQ CHALLENGE</h1>
        {loading && (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
        <p className={styles.cargandoDatos}>Cargando datos...</p>
        <div className={styles.cargandoDatosPetit}>El tiempo de espera es necesario para evitar la sobrecarga de la API sorry 😜</div>

      </div>
      )}
      <div className={styles.controls}>
       <button
        className={`${!canRefresh ? styles.refreshButtonMal : styles.refreshButton}`}
        onClick={loadData}
        disabled={!canRefresh}>
          Refrescar
        </button>
        <p className={styles.lastUpdate}>Última actualización hace: {timeSince}</p>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => handleSort("pos")}>
                #
                {sortBy === "pos" && (sortDir === "asc" ? " ▲" : " ▼")}
              </th>
              <th onClick={() => handleSort("name")}>
                Jugador
                {sortBy === "name" && (sortDir === "asc" ? " ▲" : " ▼")}
              </th>
              <th onClick={() => handleSort("rank")}>
                Rango
                {sortBy === "rank" && (sortDir === "asc" ? " ▲" : " ▼")}
              </th>
              <th onClick={() => handleSort("partidas")}>
                Partidas
                {sortBy === "partidas" && (sortDir === "asc" ? " ▲" : " ▼")}
              </th>
                <th onClick={() => handleSort("wr")}>
                    Win Rate
                {sortBy === "wr" && (sortDir === "asc" ? " ▲" : " ▼")}
              </th>
              <th onClick={() => handleSort("actividad")}>
                Actividad
                {sortBy === "actividad" && (sortDir === "asc" ? " ▲" : " ▼")}
              </th>
            </tr>
          </thead>
          <tbody>
            {getSortedData().map((player, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                  <td
                    onClick={() => abrirOpGG(player.name + "-" + player.tag)}
                    className={styles.playerCell}
                    style={{ cursor: 'pointer' }}>

                  <Image
                    src={player.imageUrl}
                    alt={player.name}
                    width={40}
                    height={40}
                    className={styles.avatar}
                  />
                  {player.name}
                </td>
                <td>
                  {player.rank?.toUpperCase().includes("UNRANKED")
                    ? "UNRANKED"
                    : player.rank}
                </td>
                <td>
                  {player.rank?.toUpperCase().includes("UNRANKED")
                    ? "-"
                    : `V: ${player.wins} D: ${player.losses}`}
                </td>
                <td>
                  {player.rank?.toUpperCase().includes("UNRANKED")
                    ? "-"
                    : ((player.wins ?? 0) / ((player.wins ?? 0) + (player.losses ?? 0)) * 100).toFixed(1) + "%"}
                </td>
                <td>
                  {getActividadEmoji(player.wins, player.losses)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </body>
    </main>
  );
}
