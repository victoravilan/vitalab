// Pistas sobre fórmulas químicas para cada vitamina y mineral
export const chemicalHints = {
  'C₆H₈O₆': 'Esta fórmula representa el ácido ascórbico, conocido comúnmente como vitamina C. La presencia de múltiples grupos hidroxilo (-OH) le confiere sus propiedades antioxidantes y su capacidad para regenerar otros antioxidantes. Es esencial para la síntesis de colágeno y potencia significativamente la absorción de hierro no hemo.',
  
  'Fe²⁺': 'Este es el ion ferroso, la forma de hierro más fácilmente absorbible por el organismo. El número 2+ indica que ha perdido dos electrones, lo que lo hace más soluble y biodisponible que el hierro férrico (Fe³⁺). Es fundamental para el transporte de oxígeno en la hemoglobina.',
  
  'C₂₇H₄₄O': 'Esta es la estructura del colecalciferol o vitamina D3, la forma más eficaz de vitamina D. Su estructura similar a las hormonas esteroides le permite actuar como un regulador génico, controlando la absorción de calcio y la función inmunológica.',
  
  'Ca²⁺': 'El ion calcio, esencial para la contracción muscular, la coagulación sanguínea y la formación de huesos y dientes. Su carga positiva doble (+2) le permite formar enlaces iónicos fuertes con fosfatos en el tejido óseo.',
  
  'C₁₂H₁₇N₄OS⁺': 'La tiamina o vitamina B1 en su forma activa. Contiene azufre (S) y nitrógeno (N), lo que la convierte en cofactor esencial de enzimas que metabolizan carbohidratos, especialmente en el sistema nervioso y músculo cardíaco.',
  
  'Mg²⁺': 'El ion magnesio, cofactor de más de 300 enzimas. Su pequeño tamaño y carga doble positiva lo hacen ideal para estabilizar estructuras moleculares complejas y activar enzimas que utilizan ATP.',
  
  'C₂₉H₅₀O₂': 'El alfa-tocoferol o vitamina E, con una larga cadena de átomos de carbono que le permite insertarse en las membranas celulares y protegerlas de la oxidación lipídica. Su grupo fenólico dona electrones para neutralizar radicales libres.',
  
  'C₈H₁₁NO₃': 'La piridoxina o vitamina B6, que contiene nitrógeno en su estructura piridínica. Es fundamental para el metabolismo de aminoácidos y la síntesis de neurotransmisores como serotonina y dopamina.',
  
  'Zn²⁺': 'El ion zinc, presente en más de 300 enzimas. Su capacidad para formar complejos estables con aminoácidos como cistina e histidina lo convierte en componente estructural crucial de proteínas y factores de transcripción.',
  
  'C₁₇H₂₀N₄O₆': 'La riboflavina o vitamina B2, que forma parte de las coenzimas FAD y FMN. Su estructura permite transferir electrones en reacciones de oxidación-reducción, esencial para la producción de energía celular.',
  
  'C₆H₅NO₂': 'La niacina o vitamina B3, precursora de las coenzimas NAD y NADP. Su estructura aromática simple le permite participar en más de 400 reacciones enzimáticas, especialmente en el metabolismo energético.',
  
  'C₃₁H₄₆O₂': 'La filoquinona o vitamina K1, con una larga cadena lateral que le permite integrarse en membranas. Es cofactor de enzimas que carboxilan proteínas, esencial para la coagulación sanguínea y el metabolismo óseo.',
  
  'C₁₉H₁₉N₇O₆': 'El ácido fólico, con múltiples anillos nitrogenados que le permiten transportar unidades de un carbono en la síntesis de purinas, timina y aminoácidos. Es crucial para la síntesis de ADN y división celular.',
  
  'C₆₃H₈₈CoN₁₄O₁₄P': 'La cobalamina o vitamina B12, la vitamina más compleja químicamente. Contiene cobalto (Co) en su centro, rodeado de un anillo corrin. Es única porque solo puede ser sintetizada por bacterias.',
  
  'C₄₀H₅₆': 'El beta-caroteno, un carotenoide con una larga cadena de enlaces dobles conjugados que le da su color naranja y propiedades antioxidantes. Puede dividirse en dos moléculas de vitamina A en el organismo.',
  
  'I⁻': 'El ion yoduro, la forma de yodo utilizable por la glándula tiroides. Su carga negativa permite su transporte activo hacia los folículos tiroideos, donde se incorpora en las hormonas T3 y T4.',
  
  'Se': 'El selenio elemental, que en el cuerpo se incorpora como selenocisteína en selenoproteínas. Es componente de enzimas antioxidantes como la glutatión peroxidasa, que protege contra el estrés oxidativo.',
  
  'Cu²⁺': 'El ion cúprico, forma oxidada del cobre necesaria para enzimas que requieren transferencia de electrones. Es componente de la ceruloplasmina, enzima que oxida el hierro para su transporte.',
  
  'C₂₀H₃₀O': 'El retinol o vitamina A preformada, con un anillo de ciclohexano y una cadena lateral con enlaces dobles. Es esencial para la visión, ya que forma el cromóforo de la rodopsina en los bastones de la retina.',
  
  'C₄₆H₆₄O₂': 'La menaquinona-7 o vitamina K2, con una cadena lateral más larga que la K1. Esta estructura le permite permanecer más tiempo en circulación y dirigirse específicamente a huesos y tejidos blandos.',
  
  'Cr³⁺': 'El ion crómico, forma trivalente del cromo que actúa como cofactor del factor de tolerancia a la glucosa. Potencia la acción de la insulina al facilitar su unión a los receptores celulares.',
  
  'C₅₉H₉₀O₄': 'La coenzima Q10 o ubiquinona, con una larga cadena lateral de isopreno que le permite integrarse en membranas mitocondriales. Transporta electrones en la cadena respiratoria para producir ATP.',
  
  'C₈H₁₄O₂S₂': 'El ácido alfa-lipoico, que contiene dos átomos de azufre unidos en un anillo de cinco miembros. Esta estructura única le permite funcionar como antioxidante tanto en medios acuosos como lipídicos.',
  
  'Mn²⁺': 'El ion manganoso, cofactor de enzimas antioxidantes como la superóxido dismutasa mitocondrial. También activa enzimas involucradas en la síntesis de proteoglicanos del cartílago y la formación ósea.',
};

// Función para obtener la pista de una fórmula química
export const getChemicalHint = (formula: string): string => {
  return chemicalHints[formula as keyof typeof chemicalHints] || 
    'Esta fórmula química representa un nutriente esencial con funciones específicas en el metabolismo celular.';
};
