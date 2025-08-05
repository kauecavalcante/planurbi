"use client";
import { useState, FormEvent, ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from './Selecao.module.css';
import Image from 'next/image';


type InstituicaoTipo = 'escola' | 'faculdade' | 'universidade' | '';
interface FormData {
  nome: string; data_nascimento: string; rg: string;
  cep: string; rua: string; numero: string; complemento: string; cidade: string; estado: string;
  tipo_instituicao: InstituicaoTipo; instituicao: string; serie_ano: string;
}
interface FormErrors { [key: string]: string | undefined; }


interface StepProps {
  formData: FormData;
  errors: FormErrors;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const initialFormData: FormData = {
  nome: '', data_nascimento: '', rg: '', cep: '', rua: '', numero: '',
  complemento: '', cidade: '', estado: '', tipo_instituicao: '',
  instituicao: '', serie_ano: '',
};


export default function SelecaoPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [editalAceite, setEditalAceite] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [cepLoading, setCepLoading] = useState(false);

  const resetForm = () => {
    setFormData(initialFormData);
    setEditalAceite(false);
    setStatus('idle');
    setStep(1);
    setErrors({});
  };

  const validateStep = () => {
    const newErrors: FormErrors = {};
    if (step === 1) {
      if (!formData.nome) newErrors.nome = "Nome é obrigatório.";
     
      if (!formData.data_nascimento) {
        newErrors.data_nascimento = "Data de Nascimento é obrigatória.";
      } else if (formData.data_nascimento.length < 10) {
        newErrors.data_nascimento = "Por favor, insira a data completa (DD/MM/AAAA).";
      }
      if (!formData.rg) newErrors.rg = "RG é obrigatório.";
    } else if (step === 2) {
      if (!formData.cep) newErrors.cep = "CEP é obrigatório.";
      if (!formData.rua) newErrors.rua = "Rua é obrigatória.";
      if (!formData.numero) newErrors.numero = "Número é obrigatório.";
      if (!formData.cidade) newErrors.cidade = "Cidade é obrigatória.";
      if (!formData.estado) newErrors.estado = "Estado é obrigatório.";
    } else if (step === 3) {
      if (!formData.tipo_instituicao) newErrors.tipo_instituicao = "Selecione o tipo de instituição.";
      if (!formData.instituicao) newErrors.instituicao = "Nome da instituição é obrigatório.";
      if (!formData.serie_ano) newErrors.serie_ano = "Série/Ano é obrigatório.";
      if (!editalAceite) newErrors.edital = "Você precisa de aceitar os termos do edital.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => { if (validateStep()) setStep(prev => prev + 1); };
  const prevStep = () => setStep(prev => prev - 1);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) clearError(id as keyof FormErrors);
  };

  const handleDataNascimentoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const maskedValue = value
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2');
    setFormData(prev => ({ ...prev, data_nascimento: maskedValue.slice(0, 10) }));
    if (errors.data_nascimento) clearError('data_nascimento');
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({...prev, tipo_instituicao: e.target.value as InstituicaoTipo}));
    clearError('tipo_instituicao');
  }

  const handleCepChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    const maskedCep = cep.replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);
    setFormData(prev => ({ ...prev, cep: maskedCep, rua: '', cidade: '', estado: '' }));
    if (errors.cep) clearError('cep');

    if (cep.length === 8) {
      setCepLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData(prev => ({ ...prev, cep: maskedCep, rua: data.logradouro, cidade: data.localidade, estado: data.uf }));
        } else {
          setErrors(prev => ({ ...prev, cep: 'CEP não encontrado. Verifique e tente novamente.' }));
        }
      } catch (error) {
        setErrors(prev => ({ ...prev, cep: 'Erro ao buscar CEP.' }));
      } finally {
        setCepLoading(false);
      }
    }
  };

  const clearError = (fieldName: keyof FormErrors) => {
    const newErrors = { ...errors };
    delete newErrors[fieldName];
    setErrors(newErrors);
  };


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validateStep()) return;
    setStatus('loading');
    setErrors({});

    try {
      const response = await fetch('/api/selecao-campo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setErrors({ rg: data.message });
          setStep(1);
        }
        throw new Error(data.message || 'Ocorreu um erro.');
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };


  if (status === 'success') {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.successMessage}>
          <i className='bx bxs-check-circle'></i>
          <h2>Inscrição Realizada com Sucesso!</h2>
          <p>A sua inscrição foi recebida. Entraremos em contacto em breve.</p>
          <button onClick={resetForm} className={styles.formButton}>
            Nova Inscrição
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formCard}>
        <div className={styles.brandingColumn}>
          <div className={styles.logoWrapper}><Image src="/logo-planurbi.png" alt="Logo PlanUrbi" width={180} height={55} /></div>
          <h2>Seleção de Equipe de Campo</h2>
          <p>Faça parte da equipa que irá transformar o futuro da Barra de São Miguel.</p>
        </div>
        <div className={styles.formColumn}>
          <div className={styles.mobileHeader}>
            <Image src="/logo-planurbi.png" alt="Logo PlanUrbi" width={140} height={43} />
            <h2>Seleção de Equipe de Campo</h2>
            <p>Preencha os seus dados para participar.</p>
          </div>

          <Stepper currentStep={step} />
          <form onSubmit={handleSubmit} noValidate>
            {step === 1 && <Step1 formData={formData} errors={errors} handleChange={handleChange} handleDataNascimentoChange={handleDataNascimentoChange} />}
            {step === 2 && <Step2 formData={formData} errors={errors} handleChange={handleChange} handleCepChange={handleCepChange} cepLoading={cepLoading} />}
            {step === 3 && <Step3 formData={formData} errors={errors} handleChange={handleChange} handleRadioChange={handleRadioChange} editalAceite={editalAceite} setEditalAceite={setEditalAceite} clearError={clearError} />}

            <div className={styles.navigationButtons}>
              {step > 1 && <button type="button" onClick={prevStep} className={styles.prevButton}>Voltar</button>}
              {step < 3 && <button type="button" onClick={nextStep} className={styles.nextButton}>Avançar</button>}
              {step === 3 && <button type="submit" disabled={status === 'loading'} className={styles.formButton}>{status === 'loading' ? 'Aguarde...' : 'Enviar Inscrição'}</button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


const Stepper = ({ currentStep }: { currentStep: number }) => {
  const steps = ["Dados Pessoais", "Endereço", "Formação"];
  return (
    <div className={styles.stepperContainer}>
      {steps.map((label, index) => (
        <div key={label} className={`${styles.step} ${currentStep >= index + 1 ? styles.active : ''}`}>
          <div className={styles.stepCircle}>{index + 1}</div>
          <div className={styles.stepLabel}>{label}</div>
        </div>
      ))}
      <div className={styles.progressBar}><div className={styles.progress} style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}></div></div>
    </div>
  );
};

const Step1 = ({ formData, errors, handleChange, handleDataNascimentoChange }: StepProps & { handleDataNascimentoChange: (e: ChangeEvent<HTMLInputElement>) => void; }) => (
  <div className={styles.stepContent}>
    <h3>Dados Pessoais</h3>
    <div className={styles.inputGroup}><div className={styles.inputWrapper}> <i className='bx bxs-user'></i> <input type="text" id="nome" value={formData.nome} onChange={handleChange} placeholder="Nome Completo" required className={errors.nome ? styles.inputError : ''} /> </div>{errors.nome && <span className={styles.fieldErrorMessage}>{errors.nome}</span>}</div>
    <div className={styles.inputGroup}><div className={styles.inputWrapper}> <i className='bx bxs-calendar'></i> <input type="text" id="data_nascimento" value={formData.data_nascimento} onChange={handleDataNascimentoChange} placeholder="Data de Nascimento (DD/MM/AAAA)" required className={errors.data_nascimento ? styles.inputError : ''} /> </div>{errors.data_nascimento && <span className={styles.fieldErrorMessage}>{errors.data_nascimento}</span>}</div>
    <div className={styles.inputGroup}><div className={styles.inputWrapper}> <i className='bx bxs-id-card'></i> <input type="text" id="rg" value={formData.rg} onChange={handleChange} placeholder="RG" required className={errors.rg ? styles.inputError : ''} /> </div>{errors.rg && <span className={styles.fieldErrorMessage}>{errors.rg}</span>}</div>
  </div>
);

const Step2 = ({ formData, errors, handleChange, handleCepChange, cepLoading }: StepProps & { handleCepChange: (e: ChangeEvent<HTMLInputElement>) => void; cepLoading: boolean; }) => (
  <div className={styles.stepContent}>
    <h3>Endereço</h3>
    <div className={styles.formGrid}>
        <div className={styles.inputGroup}><div className={styles.inputWrapper}> <i className='bx bxs-map-pin'></i> <input type="text" id="cep" value={formData.cep} onChange={handleCepChange} placeholder="CEP" required className={errors.cep ? styles.inputError : ''} /> {cepLoading && <div className={styles.spinner}></div>} </div>{errors.cep && <span className={styles.fieldErrorMessage}>{errors.cep}</span>}</div>
        <div className={styles.inputGroup}><div className={styles.inputWrapper}> <i className='bx bxs-road'></i> <input type="text" id="rua" value={formData.rua} onChange={handleChange} placeholder="Rua" required className={errors.rua ? styles.inputError : ''} /> </div>{errors.rua && <span className={styles.fieldErrorMessage}>{errors.rua}</span>}</div>
    </div>
    <div className={styles.formGrid}>
        <div className={styles.inputGroup}><div className={styles.inputWrapper}> <i className='bx bxs-home'></i> <input type="text" id="numero" value={formData.numero} onChange={handleChange} placeholder="Número" required className={errors.numero ? styles.inputError : ''} /> </div>{errors.numero && <span className={styles.fieldErrorMessage}>{errors.numero}</span>}</div>
        <div className={styles.inputGroup}><div className={styles.inputWrapper}> <i className='bx bx-plus-circle'></i> <input type="text" id="complemento" value={formData.complemento} onChange={handleChange} placeholder="Complemento (Opcional)" /> </div></div>
    </div>
    <div className={styles.formGrid}>
        <div className={styles.inputGroup}><div className={styles.inputWrapper}> <i className='bx bxs-city'></i> <input type="text" id="cidade" value={formData.cidade} onChange={handleChange} placeholder="Cidade" required readOnly className={errors.cidade ? styles.inputError : ''} /> </div>{errors.cidade && <span className={styles.fieldErrorMessage}>{errors.cidade}</span>}</div>
        <div className={styles.inputGroup}><div className={styles.inputWrapper}> <i className='bx bxs-flag-alt'></i> <input type="text" id="estado" value={formData.estado} onChange={handleChange} placeholder="Estado" required readOnly className={errors.estado ? styles.inputError : ''} /> </div>{errors.estado && <span className={styles.fieldErrorMessage}>{errors.estado}</span>}</div>
    </div>
  </div>
);

const Step3 = ({ formData, errors, handleChange, handleRadioChange, editalAceite, setEditalAceite, clearError }: StepProps & { handleRadioChange: (e: ChangeEvent<HTMLInputElement>) => void; editalAceite: boolean; setEditalAceite: Dispatch<SetStateAction<boolean>>; clearError: (name: keyof FormErrors) => void; }) => (
  <div className={styles.stepContent}>
    <h3>Formação Acadêmica</h3>
    <div className={styles.radioGroup}>
      <label>Tipo de Instituição:</label>
      <div className={styles.radioOptions}>
        <div className={styles.radioOption}><input type="radio" id="escola" name="tipo_instituicao" value="escola" checked={formData.tipo_instituicao === 'escola'} onChange={handleRadioChange} /><label htmlFor="escola">Escola</label></div>
        <div className={styles.radioOption}><input type="radio" id="faculdade" name="tipo_instituicao" value="faculdade" checked={formData.tipo_instituicao === 'faculdade'} onChange={handleRadioChange} /><label htmlFor="faculdade">Faculdade</label></div>
        <div className={styles.radioOption}><input type="radio" id="universidade" name="tipo_instituicao" value="universidade" checked={formData.tipo_instituicao === 'universidade'} onChange={handleRadioChange} /><label htmlFor="universidade">Universidade</label></div>
      </div>
      {errors.tipo_instituicao && <span className={styles.fieldErrorMessage}>{errors.tipo_instituicao}</span>}
    </div>
    <div className={styles.inputGroup}><div className={styles.inputWrapper}> <i className='bx bxs-school'></i> <input type="text" id="instituicao" value={formData.instituicao} onChange={handleChange} placeholder="Nome da Instituição" required className={errors.instituicao ? styles.inputError : ''} /> </div>{errors.instituicao && <span className={styles.fieldErrorMessage}>{errors.instituicao}</span>}</div>
    <div className={styles.inputGroup}><div className={styles.inputWrapper}> <i className='bx bxs-graduation'></i> <input type="text" id="serie_ano" value={formData.serie_ano} onChange={handleChange} placeholder="Série/Ano" required className={errors.serie_ano ? styles.inputError : ''} /> </div>{errors.serie_ano && <span className={styles.fieldErrorMessage}>{errors.serie_ano}</span>}</div>
    <div className={styles.checkboxGroup}>
      <input type="checkbox" id="edital" checked={editalAceite} onChange={(e) => { setEditalAceite(e.target.checked); clearError('edital'); }} />
      <label htmlFor="edital">Declaro que li e concordo com as condições do <strong>Edital Nº 01/2025</strong>.</label>
    </div>
    {errors.edital && <span className={styles.fieldErrorMessage}>{errors.edital}</span>}
  </div>
);