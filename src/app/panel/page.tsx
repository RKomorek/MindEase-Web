'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import SafeAreaWrapper from '@/components/ui/safe-area-wrapper';
import { ThemedView } from '@/components/ui/themed-view';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToggleRow } from '@/components/ui/toggle-row';
import { StepperRow } from '@/components/ui/stepper-row';

import { useSettingsStore } from '@/shared/stores/settings-store';
import { useThemeColor } from '@/shared/hooks/use-theme-color';

import {
  useCognitiveSpacing,
  useCognitiveScreenTitleStyle,
  useCognitiveTextStyle,
} from '@/components/ui/cognitive-styles';

export default function PanelPage() {
  const router = useRouter();

  const foreground = useThemeColor({}, 'foreground');
  const muted = useThemeColor({}, 'muted');
  const border = useThemeColor({}, 'border');

  const titleStyle = useCognitiveScreenTitleStyle();
  const textStyle = useCognitiveTextStyle();
  const sectionTitleStyle = useCognitiveTextStyle({ weight: '700' });

  const { pad, gap } = useCognitiveSpacing();

  const settings = useSettingsStore();

  useEffect(() => {
    if (!settings.hydrated) {
      settings.hydrate();
    }
  }, [settings]);

  const isSimple = settings.complexityLevel === 'simple';
  const isAdvanced = settings.complexityLevel === 'advanced';

  return (
    <SafeAreaWrapper>
      <ThemedView
        style={{
          flex: 1,
          minHeight: '100vh',
          padding: pad,
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >

          {/* Header */}

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button
              title="←"
              variant="ghost"
              onClick={() => router.push('/')}
              style={{ minWidth: 44 }}
            />

            <h1 style={{ ...titleStyle, color: foreground, margin: 0 }}>
              Painel Cognitivo
            </h1>
          </div>

          <p style={{ ...textStyle, color: muted }}>
            Ajuste a interface para reduzir sobrecarga e manter o foco.
          </p>

          {/* Complexidade e modo de uso */}

          <Card style={{ display: 'flex', flexDirection: 'column', gap: gap }}>
            <h2 style={{ ...sectionTitleStyle, color: foreground }}>
              Nível de complexidade
            </h2>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button
                title="Básico"
                variant={settings.complexityLevel === 'simple' ? 'primary' : 'secondary'}
                onClick={() => settings.setComplexity('simple')}
              />

              <Button
                title="Normal"
                variant={settings.complexityLevel === 'standard' ? 'primary' : 'secondary'}
                onClick={() => settings.setComplexity('standard')}
              />

              <Button
                title="Avançado"
                variant={settings.complexityLevel === 'advanced' ? 'primary' : 'secondary'}
                onClick={() => settings.setComplexity('advanced')}
              />
            </div>

            <ToggleRow
              label="Modo foco"
              value={settings.focusMode}
              onChange={settings.setFocusMode}
              description="Oculta elementos secundários e ajuda na concentração"
            />

            <h2 style={{ ...sectionTitleStyle, color: foreground }}>
              Modo de visualização
            </h2>
            <div style={{ display: 'flex', gap: 12 }}>
              <Button
                title="Resumo"
                variant={settings.viewMode === 'summary' ? 'primary' : 'secondary'}
                onClick={() => settings.setViewMode('summary')}
              />

              <Button
                title="Detalhado"
                variant={settings.viewMode === 'detailed' ? 'primary' : 'secondary'}
                onClick={() => settings.setViewMode('detailed')}
              />
            </div>
            
            {!isSimple && (
                <>
                <h2 style={{ ...sectionTitleStyle, color: foreground }}>
                Perfil de navegação
              </h2>
              <div style={{ display: 'flex', gap: 12 }}>
                <Button
                  title="Guiado"
                  variant={settings.navigationProfile === 'guided' ? 'primary' : 'secondary'}
                  onClick={() => settings.setNavigationProfile('guided')}
                />

                <Button
                  title="Padrão"
                  variant={settings.navigationProfile === 'standard' ? 'primary' : 'secondary'}
                  onClick={() => settings.setNavigationProfile('standard')}
                />
              </div>
              </>
            )}
          </Card>

          {/* Acessibilidade */}

          <Card style={{ display: 'flex', flexDirection: 'column', gap: gap }}>

            <StepperRow
              label="Contraste"
              valueLabel={String(settings.contrastIntensity)}
              onDec={() =>
                settings.setContrastIntensity(
                  Math.max(0, settings.contrastIntensity - 1)
                )
              }
              onInc={() =>
                settings.setContrastIntensity(
                  Math.min(3, settings.contrastIntensity + 1)
                )
              }
            />
            <p style={{ ...textStyle, color: muted }}>
              Ajuste o contraste para melhorar a legibilidade.
          </p>

            <StepperRow
              label="Espaçamento"
              valueLabel={String(settings.spacingIntensity)}
              onDec={() =>
                settings.setSpacingIntensity(
                  Math.max(0, settings.spacingIntensity - 1)
                )
              }
              onInc={() =>
                settings.setSpacingIntensity(
                  Math.min(3, settings.spacingIntensity + 1)
                )
              }
            />
            <p style={{ ...textStyle, color: muted }}>
              Mais espaço reduz estímulos e melhora escaneabilidade.
            </p>
            <StepperRow
              label="Tamanho da fonte"
              valueLabel={`${Math.round(settings.fontScale * 100)}%`}
              onDec={() =>
                settings.setFontScale(
                  Math.max(0.9, Number((settings.fontScale - 0.05).toFixed(2)))
                )
              }
              onInc={() =>
                settings.setFontScale(
                  Math.min(1.4, Number((settings.fontScale + 0.05).toFixed(2)))
                )
              }
            />
            <p style={{ ...textStyle, color: muted }}>
              Ajuste o tamanho da fonte para uma leitura mais confortável.
            </p>
            {isAdvanced && (
              <ToggleRow
                label="Animações"
                value={settings.animationsEnabled}
                onChange={settings.setAnimationsEnabled}
                description="Desative para reduzir estímulos visuais"
              />
            )}
          </Card>

          {/* Alertas */}

          <Card style={{ display: 'flex', flexDirection: 'column', gap: gap }}>

            <ToggleRow
              label="Alertas cognitivos"
              value={settings.cognitiveAlertsEnabled}
              onChange={settings.setCognitiveAlerts}
              description="Lembra se você ficou muito tempo na mesma tarefa"
            />

            <ToggleRow
              label="Avisos de transição"
              value={settings.transitionCuesEnabled}
              onChange={settings.setTransitionCues}
              description="Mensagens suaves ao trocar fases ou tarefas"
            />

            {!isSimple && (
              <StepperRow
                label="Tempo para alerta"
                valueLabel={`${settings.cognitiveAlertMinutes} min`}
                onDec={() =>
                  settings.setCognitiveAlertMinutes(
                    Math.max(5, settings.cognitiveAlertMinutes - 5)
                  )
                }
                onInc={() =>
                  settings.setCognitiveAlertMinutes(
                    Math.min(120, settings.cognitiveAlertMinutes + 5)
                  )
                }
              />
            )}
            <p style={{ ...textStyle, color: muted }}>
              Recomendação de 20 a 30 minutos para alertas.
            </p>
            <Button
              title="Testar alerta"
              variant="secondary"
              onClick={() =>
                alert(
                  'Alerta cognitivo: você está muito tempo nesta tarefa.'
                )
              }
            />
          </Card>

          {/* Preview */}

          <Card style={{ display: 'flex', flexDirection: 'column', gap: gap }}>
            <h2 style={{ ...sectionTitleStyle, color: foreground }}>
              Pré-visualização
            </h2>

            <p style={{ ...textStyle, color: muted }}>
              O texto e espaçamento refletem suas preferências atuais.
            </p>

            <div
              style={{
                borderWidth: settings.contrastIntensity >= 2 ? 2 : 1,
                borderRadius: 14,
                padding: 12,
                borderColor: border,
              }}
            >
              <p style={{ ...sectionTitleStyle, color: foreground }}>
                Tarefa atual
              </p>

              <p style={{ ...textStyle, color: muted, marginTop: 6 }}>
                {settings.viewMode === 'summary'
                  ? 'Resumo: 1 etapa pendente'
                  : 'Detalhado: revisar tópicos, fazer exercícios, marcar checklist e encerrar'}
              </p>
            </div>
          </Card>

        </div>
      </ThemedView>
    </SafeAreaWrapper>
  );
}