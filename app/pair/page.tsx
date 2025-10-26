'use client';

import { useState, useRef, useEffect, type CSSProperties } from 'react';
import { Header } from '../../components/Header';
import { useCountryDetection } from '../../hooks/useCountryDetection';
import { useApi } from '../../hooks/useApi';
import { useRouter } from 'next/navigation';
import { PairingResponse } from '../../lib/types';
import { ToastContainer } from '../../components/Toast';
import { useToast } from '../../hooks/useToast';
import Link from 'next/link';

export default function PairPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPairCode, setShowPairCode] = useState(false);
  const [pairCodeData, setPairCodeData] = useState<{ code?: string, qr?: string, link?: string } | null>(null);
  const [currentNumber, setCurrentNumber] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { post } = useApi();
  const { toasts, showToast, removeToast } = useToast();
  
  const {
    phoneNumber,
    detectedCountry,
    validation,
    isFocused,
    setIsFocused,
    updatePhoneNumber,
    resetDetection,
    hasCountry,
    isComplete,
    validationError
  } = useCountryDetection();

  useEffect(() => {
    // Initialize scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePhoneNumber(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (!text) {
        showToast('No code to copy', 'Pairing code is not available', 'error');
        return;
      }

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      const copyButton = document.querySelector('.copy-button');
      if (copyButton) {
        copyButton.classList.add('copied');
        setTimeout(() => {
          copyButton.classList.remove('copied');
        }, 600);
      }
      
      showToast('Copied!', 'Pairing code copied to clipboard', 'success');
    } catch (err) {
      console.error('Copy failed:', err);
      showToast('Failed to copy', 'Please copy the code manually: ' + text, 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validation.valid) {
      showToast('Invalid Number', validationError || 'Please enter a valid phone number', 'error');
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setCurrentNumber(phoneNumber);

    try {
      const response = await post('/api/pair', { number: phoneNumber });

      if (response.success) {
        const pairingData = response.data as PairingResponse;
        const pairCode = pairingData?.code || pairingData?.pairCode;
        
        setPairCodeData({
          code: pairCode,
          qr: pairingData?.qr,
          link: pairingData?.link
        });
        setShowPairCode(true);
        
        if (pairCode) {
          showToast('Success', `Pairing code: ${pairCode}`, 'success');
        } else {
          showToast('Success', 'Phone number paired successfully!', 'success');
        }
        
        resetDetection();
      } else {
        const errorMsg = response.error || 'Failed to pair phone number';
        const statusCode = response.statusCode || response.response?.status;
        
        if (statusCode === 403 || errorMsg.includes('ban') || errorMsg.includes('blocked')) {
          router.push('/blocked');
        } else if (statusCode === 409 || errorMsg.includes('already connected') || errorMsg.includes('already in use')) {
          showToast('Already Connected', 'This number is already connected. Please logout from your WhatsApp bot first and try again.', 'warning');
        } else {
          showToast('Pairing Failed', errorMsg, 'error');
        }
      }
    } catch (error: any) {
      showToast('Network Error', 'Failed to connect to server. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header onRefresh={() => router.push('/')} showRefreshButton={false} />
      
      <main className="main-content pair-page">
        {/* Back Button */}
        <div className="back-link-container scroll-animate" style={{ '--animation-order': 0 } as CSSProperties}>
          <Link href="/" className="back-link">
            <i className="fas fa-arrow-left"></i>
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Pair Form Section */}
        <section className="pair-form-section scroll-animate" style={{ '--animation-order': 1 } as CSSProperties}>
          <div className="pair-form-container">
            <div className="pair-form-header">
              <div className="pair-icon">
                <i className="fas fa-link"></i>
              </div>
              <h1>Pair Your WhatsApp Bot</h1>
              <p>Enter your phone number to get started with X-kira WhatsApp Bot</p>
            </div>

            <form onSubmit={handleSubmit} className="pair-form">
              <div className="form-group">
                <label htmlFor="pairNumber">
                  <i className="fas fa-phone"></i>
                  Phone Number
                </label>
                <div 
                  className={`input-wrapper ${isFocused ? 'focused' : ''} ${hasCountry ? 'has-country-code' : ''} ${phoneNumber ? 'has-value' : ''} ${isComplete ? 'number-complete' : ''}`}
                >
                  <i className="fas fa-phone input-icon"></i>
                  <input
                    ref={inputRef}
                    type="tel"
                    id="pairNumber"
                    value={phoneNumber}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter number (e.g., 919876543210)"
                    required
                    inputMode="numeric"
                    autoComplete="tel"
                    pattern="^[\d\s-]{10,18}$"
                    title="Enter phone number with country code"
                  />
                  
                  {detectedCountry && (
                    <div className={`country-code-display ${hasCountry ? 'show' : ''} ${isComplete ? 'complete' : 'detected'} ${isFocused ? 'focused' : ''}`}>
                      <div className="country-badge">
                        <span className="country-flag">{detectedCountry.countryInfo.flag}</span>
                        <span className="country-code">+{detectedCountry.countryCode}</span>
                      </div>
                    </div>
                  )}
                </div>
                <small className="form-help">
                  <i className="fas fa-info-circle"></i>
                  Enter your phone number with country code (e.g., 919876543210). Country will be auto-detected.
                </small>
                {validationError && (
                  <div className="error-message">
                    <i className="fas fa-exclamation-triangle"></i>
                    {validationError}
                  </div>
                )}
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary btn-large"
                disabled={isSubmitting || !validation.valid}
              >
                <span className="btn-text">
                  {isSubmitting ? 'Getting Pairing Code...' : 'Get Pairing Code'}
                </span>
                {isSubmitting && (
                  <div className="btn-loader">
                    <i className="fas fa-spinner fa-spin"></i>
                  </div>
                )}
                <div className="btn-glow"></div>
              </button>
            </form>
          </div>
        </section>

        {/* Info Section */}
        <section className="pair-info-section scroll-animate" style={{ '--animation-order': 2 } as CSSProperties}>
          <h3>
            <i className="fas fa-question-circle"></i>
            How It Works
          </h3>
          <div className="pair-info-grid">
            <div className="pair-info-card">
              <div className="pair-info-number">1</div>
              <div className="pair-info-content">
                <h4>Enter Your Number</h4>
                <p>Type your WhatsApp number with country code</p>
              </div>
            </div>
            <div className="pair-info-card">
              <div className="pair-info-number">2</div>
              <div className="pair-info-content">
                <h4>Get Pairing Code</h4>
                <p>Receive an 8-character code instantly</p>
              </div>
            </div>
            <div className="pair-info-card">
              <div className="pair-info-number">3</div>
              <div className="pair-info-content">
                <h4>Link Your Device</h4>
                <p>Enter the code in WhatsApp to connect</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Pairing Code Modal */}
      {showPairCode && (
        <div className="pairing-modal-overlay">
          <div className="pairing-modal-container">
            <div className="success-banner">
              <div className="success-content">
                <div className="success-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="success-text">
                  <h2>Phone number paired successfully!</h2>
                  <p className="success-number">{currentNumber}</p>
                </div>
              </div>
            </div>

            <div className="whatsapp-header">
              <div className="whatsapp-logo">
                <i className="fab fa-whatsapp"></i>
              </div>
              <h1 className="modal-title">WhatsApp Device Pairing</h1>
              <p className="modal-subtitle">Use this code to link your device to WhatsApp</p>
            </div>

            {pairCodeData?.code ? (
              <div className="pairing-code-section">
                <div className="code-header">
                  <i className="fas fa-key"></i>
                  <span>Your WhatsApp Pairing Code</span>
                </div>
                
                <div className="code-display-container">
                  <div 
                    className="pairing-code-display"
                    onClick={() => copyToClipboard(pairCodeData.code!)}
                    title="Click to copy code"
                  >
                    {pairCodeData.code?.split('').map((char, index) => (
                      <span 
                        key={index} 
                        className="code-char"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                  
                  <div className="code-glow"></div>
                </div>
                
                <div className="copy-actions">
                  <button
                    onClick={() => copyToClipboard(pairCodeData.code!)}
                    className="copy-button"
                  >
                    <div className="button-content">
                      <i className="fas fa-copy"></i>
                      <span>Copy Pairing Code</span>
                    </div>
                    <div className="button-shine"></div>
                  </button>
                  
                  <p className="copy-hint">Click the code above or this button to copy</p>
                </div>
              </div>
            ) : (
              <div className="error-section">
                <div className="error-icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="error-content">
                  <h3>No Pairing Code Received</h3>
                  <p>The backend didn't return a pairing code. Please try again.</p>
                </div>
              </div>
            )}

            <div className="instructions-section">
              <h3 className="instructions-title">
                <i className="fas fa-list-ol"></i>
                How to Link Your Device:
              </h3>
              <div className="steps-container">
                {[
                  { icon: "fab fa-whatsapp", title: "Open WhatsApp on your phone", desc: "Make sure you have WhatsApp installed and running" },
                  { icon: "fas fa-cog", title: "Go to Settings → Linked Devices", desc: "Tap the three dots menu, then Settings, then Linked Devices" },
                  { icon: "fas fa-link", title: 'Tap "Link a Device"', desc: "You'll see options to link using QR code or phone number" },
                  { icon: "fas fa-phone", title: 'Select "Link with phone number instead"', desc: "Choose the phone number option at the bottom" },
                  { icon: "fas fa-keyboard", title: "Enter the pairing code above", desc: "Type or paste the 8-character code exactly as shown", highlight: true }
                ].map((step, index) => (
                  <div key={index} className={`step-item ${step.highlight ? 'step-highlight' : ''}`}>
                    <div className="step-number">{index + 1}</div>
                    <div className="step-content">
                      <i className={step.icon}></i>
                      <div className="step-text">
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button
                onClick={() => {
                  setShowPairCode(false);
                  setPairCodeData(null);
                  setCurrentNumber('');
                }}
                className="close-button"
              >
                <i className="fas fa-times"></i>
                <span>Close</span>
              </button>
            </div>

            <button
              onClick={() => {
                setShowPairCode(false);
                setPairCodeData(null);
                setCurrentNumber('');
              }}
              className="floating-close-button"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
