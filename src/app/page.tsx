'use client';

import { useRouter } from 'next/navigation';

import SafeAreaWrapper from '@/components/ui/safe-area-wrapper';
import { ThemedView } from '@/components/ui/themed-view';

import MindEaseLogo from '@/components/ui/mindease-logo';

import { useThemeColor } from '@/shared/hooks/use-theme-color';
import { useCognitiveScreenTitleStyle } from '@/components/ui/cognitive-styles';

export default function HomePage() {

  const router = useRouter();

  const foreground = useThemeColor({}, 'foreground');
  const muted = useThemeColor({}, 'muted');
  const border = useThemeColor({}, 'border');

  const titleStyle = useCognitiveScreenTitleStyle();

  return (

    <SafeAreaWrapper>

      <ThemedView
        style={{
          flex: 1,
          minHeight: '100vh'
        }}
      >

        <main className="w-full min-h-screen flex items-center justify-center px-10">

          <div className="grid grid-cols-2 max-w-5xl w-full items-center gap-16">

            {/* LEFT */}

            <div className="flex flex-col gap-6">

              <MindEaseLogo size={120} showCircleBorder />

              <h1
                style={{
                  ...titleStyle,
                  color: foreground,
                  lineHeight: '1.1'
                }}
                className="text-4xl font-bold"
              >
                MindEase
              </h1>

              <p
                style={{ color: muted }}
                className="text-lg max-w-md"
              >
                Organize suas tarefas, reduza a sobrecarga mental
                e mantenha o foco no que realmente importa.
              </p>

            </div>

            {/* RIGHT */}

            <div className="flex flex-col gap-6">

              <HomeCard
                title="Tarefas"
                description="Organize e acompanhe suas tarefas diárias."
                onClick={() => router.push('/tasks')}
                foreground={foreground}
                muted={muted}
                border={border}
              />

              <HomeCard
                title="Painel Cognitivo"
                description="Ajuste a interface para reduzir sobrecarga mental e melhorar seu foco."
                onClick={() => router.push('/panel')}
                foreground={foreground}
                muted={muted}
                border={border}
              />

              <HomeCard
                title="Configurações"
                description="Ajuste preferências e recursos cognitivos."
                onClick={() => router.push('/profile')}
                foreground={foreground}
                muted={muted}
                border={border}
              />

            </div>

          </div>

        </main>

      </ThemedView>

    </SafeAreaWrapper>
  );
}

function HomeCard({
  title,
  description,
  onClick,
  foreground,
  muted,
  border
}: {
  title: string
  description: string
  onClick: () => void
  foreground: string
  muted: string
  border: string
}) {

  return (

    <div
      onClick={onClick}
      className="p-8 rounded-2xl cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02]"
      style={{ border: `1px solid ${border}` }}
    >

      <h2
        className="text-xl font-semibold mb-2"
        style={{ color: foreground }}
      >
        {title}
      </h2>

      <p
        style={{ color: muted }}
      >
        {description}
      </p>

    </div>

  )
}