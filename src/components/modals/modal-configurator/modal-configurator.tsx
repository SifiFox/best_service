'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Briefcase,
  Check,
  Coins,
  Cpu,
  Fan,
  Gamepad2,
  Loader2,
  MemoryStick,
  Monitor,
  Sparkles,
} from 'lucide-react';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { z } from 'zod';

import { isValidPhoneNumber, normalizePhoneNumber } from '@/lib/phone';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';

import { useCreateAsk } from '@/entities/ask/hooks/use-ask';
import ApproveCheckbox from '@/shared/approve-checkbox/approve-checkbox';

import { generateConfigAction } from './actions';

// --- Types ---

type QuestionId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type Option = {
  id: string;
  label: string;
  icon?: ReactNode;
  description?: string;
};

type Question = {
  id: QuestionId;
  text: string;
  type: 'single' | 'multiple';
  layout: 'cards-grid' | 'split-image';
  options: Option[];
  sideImage?: ReactNode;
};

// --- Data ---

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Для чего вы собираете компьютер?',
    type: 'single',
    layout: 'cards-grid',
    options: [
      {
        id: 'games',
        label: 'Игры',
        icon: <Gamepad2 className="h-12 w-12" />,
        description: 'Максимальная производительность',
      },
      {
        id: 'work',
        label: 'Работа',
        icon: <Briefcase className="h-12 w-12" />,
        description: 'Стабильность и многозадачность',
      },
    ],
  },
  {
    id: 2,
    text: 'Предпочтения по корпусу (Выберите один или несколько)',
    type: 'multiple',
    layout: 'split-image',
    sideImage: <Box className="h-32 w-32 text-muted-foreground/20" />,
    options: [
      { id: 'compact', label: 'Компактный' },
      { id: 'mid', label: 'Среднего размера' },
      { id: 'large', label: 'Большой корпус для мощных систем' },
      { id: 'rgb', label: 'Наличие подсветки (RGB)' },
    ],
  },
  {
    id: 3,
    text: 'Какой у вас бюджет на сборку?',
    type: 'single',
    layout: 'split-image',
    sideImage: <Coins className="h-32 w-32 text-muted-foreground/20" />,
    options: [
      { id: 'up_to_100', label: 'до 100.000 ₽' },
      { id: '100_150', label: '100.000 - 150.000 ₽' },
      { id: '150_200', label: '150.000 - 200.000 ₽' },
      { id: '200_plus', label: '200.000+ ₽' },
    ],
  },
  {
    id: 4,
    text: 'Выбор процессора',
    type: 'single',
    layout: 'cards-grid',
    options: [
      { id: 'amd', label: 'AMD', icon: <Cpu className="h-12 w-12 text-red-600" /> },
      { id: 'intel', label: 'Intel', icon: <Cpu className="h-12 w-12 text-blue-600" /> },
    ],
  },
  {
    id: 5,
    text: 'Выбор видеокарты',
    type: 'single',
    layout: 'cards-grid',
    options: [
      { id: 'nvidia', label: 'Nvidia', icon: <Monitor className="h-12 w-12 text-green-600" /> },
      { id: 'amd', label: 'AMD', icon: <Monitor className="h-12 w-12 text-red-600" /> },
    ],
  },
  {
    id: 6,
    text: 'Оперативная память',
    type: 'single',
    layout: 'split-image',
    sideImage: <MemoryStick className="h-32 w-32 text-muted-foreground/20" />,
    options: [
      { id: '8gb', label: '8 ГБ' },
      { id: '16gb', label: '16 ГБ' },
      { id: '32gb', label: '32 ГБ' },
      { id: '64gb', label: '64 ГБ' },
    ],
  },
  {
    id: 7,
    text: 'Тип охлаждения',
    type: 'single',
    layout: 'split-image',
    sideImage: <Fan className="h-32 w-32 text-muted-foreground/20" />,
    options: [
      { id: 'air', label: 'Стандартное воздушное охлаждение' },
      { id: 'liquid', label: 'Жидкостное охлаждение' },
      { id: 'unsure', label: 'Затрудняюсь ответить' },
    ],
  },
];

// --- Schema ---

const formSchema = z.object({
  name: z.string().min(1, 'Введите имя'),
  phone: z.string().refine(isValidPhoneNumber, {
    message: 'Введите корректный номер телефона',
  }),
  agreement: z.boolean().refine(val => val === true, {
    message: 'Необходимо принять условия',
  }),
});

type FormValues = z.infer<typeof formSchema>;

// --- Component ---

type ModalConfiguratorProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalConfigurator({ isOpen, onClose }: ModalConfiguratorProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const createAskMutation = useCreateAsk();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      agreement: false,
    },
  });

  const currentQuestion = QUESTIONS[step];
  const isLastStep = step === QUESTIONS.length;

  const handleOptionSelect = (optionId: string) => {
    if (!currentQuestion) return;

    if (currentQuestion.type === 'single') {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
    } else {
      setAnswers(prev => {
        const current = (prev[currentQuestion.id] as string[]) || [];
        if (current.includes(optionId)) {
          return { ...prev, [currentQuestion.id]: current.filter(id => id !== optionId) };
        }
        return { ...prev, [currentQuestion.id]: [...current, optionId] };
      });
    }
  };

  const handleNext = () => {
    if (step < QUESTIONS.length && currentQuestion) {
      // Validation
      const currentAnswer = answers[currentQuestion.id];
      if (!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)) {
        toast.error('Выберите вариант ответа');
        return;
      }
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const handleAiSuggest = async () => {
    setIsAiLoading(true);
    // Format answers for AI
    const formattedAnswers = QUESTIONS.map(q => {
      const answer = answers[q.id];
      const answerLabel = Array.isArray(answer)
        ? answer
            .map(id => q.options.find(o => o.id === id)?.label)
            .filter(Boolean)
            .join(', ')
        : q.options.find(o => o.id === answer)?.label;
      return `${q.text}: ${answerLabel}`;
    }).join('\n');

    const result = await generateConfigAction(formattedAnswers);

    if (result.success && result.message) {
      setAiResult(result.message);
      toast.success('Конфигурация подобрана!');
    } else {
      toast.error(result.message || 'Ошибка при генерации');
    }
    setIsAiLoading(false);
  };

  const onSubmit = async (data: FormValues) => {
    const message = QUESTIONS.map(q => {
      const answer = answers[q.id];
      const answerLabel = Array.isArray(answer)
        ? answer
            .map(id => q.options.find(o => o.id === id)?.label)
            .filter(Boolean)
            .join(', ')
        : q.options.find(o => o.id === answer)?.label;
      return `${q.text}: ${answerLabel}`;
    }).join('\n');

    const fullMessage = `Результаты конфигуратора:\n\n${message}\n\n${
      aiResult ? `AI Рекомендация:\n${aiResult}` : 'AI подбор не запрашивался'
    }`;

    try {
      await createAskMutation.mutateAsync({
        phone: normalizePhoneNumber(data.phone),
        name: data.name,
        email: null,
        message: fullMessage,
      });

      toast.success('Заявка отправлена! Мы скоро свяжемся с вами.');
      handleClose();
    } catch {
      toast.error('Ошибка при отправке. Попробуйте позже.');
    }
  };

  const handleClose = () => {
    setStep(0);
    setAnswers({});
    setAiResult(null);
    form.reset();
    onClose();
  };

  const progress = Math.round((step / QUESTIONS.length) * 100);

  const renderCardsGrid = (question: Question) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {question.options.map(option => {
        const isSelected = answers[question.id] === option.id;
        return (
          <div
            className={cn(
              'cursor-pointer rounded-xl border-2 p-6 transition-all hover:border-primary/50 hover:bg-secondary/50',
              isSelected
                ? 'border-primary bg-secondary/30 ring-1 ring-primary'
                : 'border-muted bg-card'
            )}
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div
                className={cn(
                  'flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-primary shrink-0',
                  isSelected && 'bg-primary text-white'
                )}
              >
                {option.icon}
              </div>
              <div className="space-y-1">
                <div className="font-bold text-lg leading-tight">{option.label}</div>
                {option.description && (
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderSplitImage = (question: Question) => (
    <div className="flex flex-col-reverse sm:flex-row gap-6 h-full">
      <div className="flex-1 flex flex-col gap-3">
        {question.options.map(option => {
          const isSelected =
            question.type === 'single'
              ? answers[question.id] === option.id
              : (answers[question.id] as string[])?.includes(option.id);

          return (
            <div
              className={cn(
                'flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors',
                isSelected
                  ? 'border-primary bg-secondary/30'
                  : 'border-border hover:bg-secondary/20'
              )}
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="shrink-0">
                {question.type === 'multiple' ? (
                  <div
                    className={cn(
                      'h-5 w-5 rounded border border-primary flex items-center justify-center',
                      isSelected && 'bg-primary text-white'
                    )}
                  >
                    {isSelected && <Check className="h-3.5 w-3.5" />}
                  </div>
                ) : (
                  <div
                    className={cn(
                      'h-5 w-5 rounded-full border border-primary flex items-center justify-center',
                      isSelected && 'bg-primary'
                    )}
                  >
                    {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                  </div>
                )}
              </div>
              <div className="font-medium text-lg">{option.label}</div>
            </div>
          );
        })}
      </div>
      <div className="w-full sm:w-1/3 flex items-center justify-center bg-secondary/20 rounded-xl p-6 min-h-[200px]">
        {question.sideImage || <Box className="h-24 w-24 text-muted-foreground/20" />}
      </div>
    </div>
  );

  return (
    <Dialog onOpenChange={open => !open && handleClose()} open={isOpen}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden gap-0 max-h-[90vh] flex flex-col">
        {!isLastStep && currentQuestion ? (
          <>
            <DialogHeader className="p-6 pb-2">
              <DialogTitle className="text-xl sm:text-2xl font-bold">
                {currentQuestion.text}
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6 pt-4">
              {currentQuestion.layout === 'cards-grid'
                ? renderCardsGrid(currentQuestion)
                : renderSplitImage(currentQuestion)}
            </div>

            <div className="p-6 border-t bg-secondary/10">
              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Готово {progress}%</span>
                  <span>
                    Шаг {step + 1} из {QUESTIONS.length}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <Button
                  className="w-full sm:w-auto"
                  disabled={step === 0}
                  onClick={handleBack}
                  variant="outline"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Назад
                </Button>
                <Button className="w-full sm:w-auto" onClick={handleNext}>
                  Далее <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full">
            <DialogHeader className="p-6 text-center space-y-4">
              <DialogTitle className="text-3xl font-bold">Почти готово!</DialogTitle>
              <p className="text-lg text-muted-foreground">
                Наш специалист свяжется с вами в ближайшее время, чтобы уточнить детали и предложить
                оптимальную конфигурацию под ваши задачи.
              </p>
            </DialogHeader>

            <div className="p-6 pt-0 flex-1 overflow-y-auto max-w-md mx-auto w-full">
              <div className="mb-6">
                {!aiResult ? (
                  <Button
                    className="w-full h-14 text-lg border-primary text-primary hover:bg-primary/10 shadow-sm"
                    disabled={isAiLoading}
                    onClick={handleAiSuggest}
                    type="button"
                    variant="outline"
                  >
                    {isAiLoading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-5 w-5" />
                    )}
                    Предложить конфигурацию с помощью AI
                  </Button>
                ) : (
                  <div className="p-4 bg-secondary/30 rounded-lg border border-primary/20 text-sm overflow-y-auto max-h-60">
                    <div className="flex items-center gap-2 font-bold text-primary mb-2 sticky top-0 bg-white/80 p-1 rounded backdrop-blur-sm">
                      <Sparkles className="h-4 w-4" /> AI Рекомендация:
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <Markdown remarkPlugins={[remarkGfm]}>{aiResult}</Markdown>
                    </div>
                  </div>
                )}
              </div>

              <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="h-14 text-lg" placeholder="Ваше имя" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PhoneInput className="h-14 text-lg" placeholder="Телефон" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agreement"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ApproveCheckbox id="agreement-quiz" onChange={field.onChange}>
                            <span className="text-sm text-muted-foreground">
                              Согласие на обработку персональных данных
                            </span>
                          </ApproveCheckbox>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className="w-full h-14 text-xl font-bold" type="submit">
                    Получить расчет
                  </Button>
                </form>
              </Form>
            </div>
            <div className="p-4 border-t bg-secondary/10 text-center">
              <Button onClick={() => setStep(QUESTIONS.length - 1)} variant="ghost">
                Вернуться к вопросам
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
